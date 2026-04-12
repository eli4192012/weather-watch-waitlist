import fs from "node:fs";
import path from "node:path";

export type WaitlistEntry = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type GitHubFile = {
  content: string;
  sha: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const localDataDirectory = path.join(process.cwd(), "data");
const localDataPath = path.join(localDataDirectory, "waitlist.json");
const githubApiVersion = "2022-11-28";

function getGitHubConfig() {
  const token = process.env.GITHUB_WAITLIST_TOKEN;
  const repo = process.env.GITHUB_WAITLIST_REPO;
  const filePath = process.env.GITHUB_WAITLIST_PATH ?? "data/waitlist.json";

  if (!token || !repo) {
    return null;
  }

  return { token, repo, filePath };
}

function encodeBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

function decodeBase64(value: string) {
  return Buffer.from(value, "base64").toString("utf8");
}

function sortEntries(entries: WaitlistEntry[]) {
  return [...entries].sort(
    (first, second) =>
      new Date(second.created_at).getTime() -
      new Date(first.created_at).getTime(),
  );
}

async function fetchGitHubWaitlist(): Promise<{
  entries: WaitlistEntry[];
  sha?: string;
}> {
  const config = getGitHubConfig();

  if (!config) {
    return { entries: readLocalWaitlist() };
  }

  const response = await fetch(
    `https://api.github.com/repos/${config.repo}/contents/${config.filePath}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "X-GitHub-Api-Version": githubApiVersion,
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return { entries: [] };
  }

  if (!response.ok) {
    throw new Error("Could not load the waitlist. Please try again.");
  }

  const file = (await response.json()) as GitHubFile;
  const decoded = decodeBase64(file.content.replaceAll("\n", ""));
  const entries = JSON.parse(decoded) as WaitlistEntry[];

  return { entries: sortEntries(entries), sha: file.sha };
}

async function saveGitHubWaitlist(entries: WaitlistEntry[], sha?: string) {
  const config = getGitHubConfig();

  if (!config) {
    writeLocalWaitlist(entries);
    return;
  }

  const response = await fetch(
    `https://api.github.com/repos/${config.repo}/contents/${config.filePath}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": githubApiVersion,
      },
      body: JSON.stringify({
        message: "Update waitlist signups",
        content: encodeBase64(`${JSON.stringify(sortEntries(entries), null, 2)}\n`),
        sha,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Could not save your signup. Please try again.");
  }
}

function readLocalWaitlist() {
  if (!fs.existsSync(localDataPath)) {
    return [];
  }

  const contents = fs.readFileSync(localDataPath, "utf8");
  return sortEntries(JSON.parse(contents) as WaitlistEntry[]);
}

function writeLocalWaitlist(entries: WaitlistEntry[]) {
  if (!fs.existsSync(localDataDirectory)) {
    fs.mkdirSync(localDataDirectory, { recursive: true });
  }

  fs.writeFileSync(
    localDataPath,
    `${JSON.stringify(sortEntries(entries), null, 2)}\n`,
    "utf8",
  );
}

export async function addToWaitlist({
  name,
  email: rawEmail,
}: {
  name: string;
  email: string;
}) {
  const cleanName = name.trim();
  const email = rawEmail.trim().toLowerCase();

  if (cleanName.length < 2) {
    throw new Error("Please enter your name.");
  }

  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const { entries, sha } = await fetchGitHubWaitlist();

  if (entries.some((entry) => entry.email === email)) {
    throw new Error("That email is already on the waitlist.");
  }

  await saveGitHubWaitlist(
    [
      {
        id: Date.now(),
        name: cleanName,
        email,
        created_at: new Date().toISOString(),
      },
      ...entries,
    ],
    sha,
  );
}

export async function getWaitlistCount() {
  const { entries } = await fetchGitHubWaitlist();
  return entries.length;
}

export async function getWaitlistEntries() {
  const { entries } = await fetchGitHubWaitlist();
  return entries;
}
