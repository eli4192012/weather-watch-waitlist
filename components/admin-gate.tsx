"use client";

import { useActionState } from "react";
import { loginToAdmin, type AdminFormState } from "@/app/actions";

const initialState: AdminFormState = {};

export function AdminGate() {
  const [state, action, pending] = useActionState(loginToAdmin, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
          Weather Watch Admin
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.05em] text-white">
          Sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/64">
          Enter your admin password to view the waitlist emails.
        </p>

        <form action={action} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.26em] text-white/48">
              Admin Password
            </span>
            <input
              type="password"
              name="password"
              required
              className="h-14 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-base text-white outline-none transition focus:border-[var(--secondary)] focus:bg-white/10"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--bg)] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Signing in..." : "View waitlist"}
          </button>
        </form>

        {state.error ? (
          <p className="mt-4 text-sm text-[var(--accent-soft)]">{state.error}</p>
        ) : null}
      </div>
    </main>
  );
}
