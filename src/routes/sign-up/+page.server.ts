import { redirect, type Actions } from "@sveltejs/kit";

export const load = ({ locals }) => {
  const localUser = locals.user;
  if (localUser) {
    throw redirect(307, "/me");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const res = await event.fetch("/api/v1/auth/sign-up", {
      method: "POST",
    });
    if (!res.ok) {
      const data = await res.json();
      return { error: data.error ?? "Unknown error" };
    }
    throw redirect(303, "/sign-in");
  },
};
