import Link from "next/link";
import { cookies } from "next/headers";
import { AdminGate } from "@/components/admin-gate";
import { LogoutButton } from "@/components/logout-button";
import { getWaitlistEntries } from "@/lib/waitlist";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("weather-watch-admin")?.value === "signed-in";

  if (!isLoggedIn) {
    return <AdminGate />;
  }

  const entries = await getWaitlistEntries();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-8 text-[var(--text)] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
              Weather Watch Admin
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-[-0.05em] text-white">
              Waitlist signups
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66">
              Every email collected through the landing page appears here.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-white/28 hover:text-white"
            >
              Back to site
            </Link>
            <LogoutButton />
          </div>
        </div>

        <section className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
              Total Emails
            </p>
            <p className="mt-3 text-4xl font-semibold text-white">
              {entries.length}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
              Latest Signup
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {entries[0]
                ? new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(entries[0].created_at))
                : "No signups yet"}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
              Launch Goal
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Build momentum before May launch
            </p>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30">
          <div className="grid grid-cols-[1fr_1.4fr] gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/42 sm:grid-cols-[1fr_1.6fr_1fr_1fr]">
            <span>Name</span>
            <span>Email</span>
            <span className="hidden sm:block">Joined</span>
            <span>Source</span>
          </div>

          <div>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-[1fr_1.4fr] gap-4 border-b border-white/6 px-5 py-4 text-sm text-white/78 last:border-b-0 sm:grid-cols-[1fr_1.6fr_1fr_1fr]"
                >
                  <span className="truncate text-white">
                    {entry.name || "No name"}
                  </span>
                  <span className="truncate">{entry.email}</span>
                  <span className="hidden sm:block">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(entry.created_at))}
                  </span>
                  <span>Landing page</span>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center text-white/58">
                No waitlist emails yet. Your first signup will show up here.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
