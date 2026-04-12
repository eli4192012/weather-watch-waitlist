import { db } from "@/lib/db";

export type WaitlistEntry = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function addToWaitlist({
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

  try {
    db.prepare(
      "INSERT INTO waitlist_entries (name, email) VALUES (@name, @email)",
    ).run({ name: cleanName, email });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      throw new Error("That email is already on the waitlist.");
    }

    throw error;
  }
}

export function getWaitlistCount() {
  const row = db
    .prepare("SELECT COUNT(*) as count FROM waitlist_entries")
    .get() as { count: number };

  return row.count;
}

export function getWaitlistEntries() {
  return db
    .prepare(
      "SELECT id, name, email, created_at FROM waitlist_entries ORDER BY datetime(created_at) DESC",
    )
    .all() as WaitlistEntry[];
}
