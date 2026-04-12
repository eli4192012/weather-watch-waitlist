"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinWaitlist, type WaitlistFormState } from "@/app/actions";

const initialState: WaitlistFormState = {};

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={action}
      className="space-y-4"
    >
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.26em] text-white/48">
          Email Address
        </span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="h-14 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-base text-white outline-none transition placeholder:text-white/32 focus:border-[var(--secondary)] focus:bg-white/10"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ee5b61)] px-6 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Joining..." : "Join the waitlist"}
      </button>

      {state.error ? (
        <p className="text-sm text-[var(--accent-soft)]">{state.error}</p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-[var(--secondary-soft)]">{state.success}</p>
      ) : null}
    </form>
  );
}
