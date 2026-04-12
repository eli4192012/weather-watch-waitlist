"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addToWaitlist } from "@/lib/waitlist";

export type WaitlistFormState = {
  error?: string;
  success?: string;
};

export type AdminFormState = {
  error?: string;
};

export async function joinWaitlist(
  _prevState: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Add an email address first." };
  }

  try {
    addToWaitlist(email);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: "You’re on the list. I’ll reach out before launch." };
}

export async function loginToAdmin(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const password = String(formData.get("password") ?? "");
  const expectedPassword = process.env.WAITLIST_ADMIN_PASSWORD;

  if (!expectedPassword) {
    return {
      error:
        "Set WAITLIST_ADMIN_PASSWORD in your environment before using the admin area.",
    };
  }

  if (password !== expectedPassword) {
    return { error: "That password didn’t match." };
  }

  const cookieStore = await cookies();
  cookieStore.set("weather-watch-admin", "signed-in", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutFromAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("weather-watch-admin");
  revalidatePath("/admin");
}
