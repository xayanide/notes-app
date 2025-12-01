import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const response = await event.fetch("/api/v1/auth/sign-out", {
    method: "POST",
  });
  if (response.ok) {
    throw redirect(302, "/");
  }
};
