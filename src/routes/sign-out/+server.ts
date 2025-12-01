import { redirect } from "@sveltejs/kit";

export const GET = async (event) => {
  const response = await event.fetch("/api/v1/auth/sign-out", {
    method: "POST",
  });
  if (response.ok) {
    return redirect(303, "/");
  }
};
