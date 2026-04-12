import { logoutFromAdmin } from "@/app/actions";

export function LogoutButton() {
  return (
    <form action={logoutFromAdmin}>
      <button
        type="submit"
        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--bg)] transition hover:bg-white/90"
      >
        Sign out
      </button>
    </form>
  );
}
