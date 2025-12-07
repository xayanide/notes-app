import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const res = await fetch("/api/v1/auth/sign-in", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      return fail(res.status, { error: data.error ?? "Failed to sign in" });
    }
    throw redirect(303, "/");
  },
};
