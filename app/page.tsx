import Image from "next/image";
import Link from "next/link";
import { LaunchCountdown } from "@/components/launch-countdown";
import { WaitlistForm } from "@/components/waitlist-form";
import { getWaitlistCount } from "@/lib/waitlist";

export default async function Home() {
  const totalSignups = await getWaitlistCount();

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <section className="relative isolate min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,46,53,0.35),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(43,96,202,0.28),_transparent_30%),linear-gradient(135deg,_#03050a_10%,_#07111f_45%,_#020304_100%)]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full border border-[rgba(43,96,202,0.28)]" />
        <div className="absolute right-[-7rem] top-1/3 h-[34rem] w-[34rem] rounded-full border border-[rgba(199,46,53,0.24)]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/68 backdrop-blur">
                Launching May 2026
              </div>
            </div>
            <Link
              href="/admin"
              className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/82 transition hover:border-white/30 hover:text-white"
            >
              Admin
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-14 py-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(199,46,53,0.85)]" />
                <span className="text-sm text-white/78">
                  Severe weather intelligence, simplified
                </span>
              </div>

              <Image
                src="/weather-watch-logo.png"
                alt="Weather Watch logo"
                width={460}
                height={220}
                priority
                className="mb-10 h-auto w-[min(100%,420px)]"
              />

              <h1 className="max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Know the storm before it knows you.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                Weather Watch is a fast, focused weather app built for people
                who want sharp alerts, cleaner radar, and less noise when the
                sky starts acting strange.
              </p>

              <p className="mt-5 max-w-xl rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm leading-6 text-white/76 backdrop-blur">
                Join before launch and you&apos;ll get one free month of all
                paid features when Weather Watch releases. No emails will be
                sent until it&apos;s time to claim that free month; this list is
                mainly to estimate how many users will be ready on launch day.
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
                    Waitlist
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {totalSignups.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/46">
                    Release Window
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    <LaunchCountdown />
                  </p>
                </div>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <div className="absolute inset-x-8 bottom-[-3rem] top-8 rounded-[2.5rem] bg-[radial-gradient(circle,_rgba(43,96,202,0.3),_transparent_62%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/38 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/46">
                      Early Access
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                      Join the Weather Watch waitlist
                    </h2>
                  </div>
                  <div className="hidden rounded-full border border-[rgba(43,96,202,0.55)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--secondary)] sm:block">
                    Radar Ready
                  </div>
                </div>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
                  Drop your email to reserve your free month of paid features.
                  You won&apos;t get emails before launch; this helps measure how
                  many Weather Watch users are ready on day one.
                </p>

                <div className="mt-8">
                  <WaitlistForm />
                </div>

                <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-sm text-white/68 sm:grid-cols-3">
                  <div>
                    <p className="font-semibold text-white">Sharp alerts</p>
                    <p className="mt-1">
                      Built to surface the stuff that actually matters.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Clean radar</p>
                    <p className="mt-1">
                      Fast visuals without the cluttered forecast maze.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">No early emails</p>
                    <p className="mt-1">
                      You&apos;ll only hear from us when your free month is ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
