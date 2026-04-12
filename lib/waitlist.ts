import { db } from "@/lib/db";

export type WaitlistEntry = {
  id: number;
  email: string;
  created_at: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function addToWaitlist(rawEmail: string) {
  const email = rawEmail.trim().toLowerCase();

  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  try {
    db.prepare(
      "INSERT INTO waitlist_entries (email) VALUES (@email)",
    ).run({ email });
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
      "SELECT id, email, created_at FROM waitlist_entries ORDER BY datetime(created_at) DESC",
    )
    .all() as WaitlistEntry[];
}
