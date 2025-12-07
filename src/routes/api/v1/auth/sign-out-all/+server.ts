import { json, type RequestHandler } from "@sveltejs/kit";
import { deleteSessionCookies, revokeAllTokens } from "$lib/server/auth";

export const POST: RequestHandler = async ({ cookies, locals }) => {
  const localUser = locals.user;
  const refreshToken = cookies.get("refresh_token");
  if (!refreshToken || !localUser) {
    deleteSessionCookies(cookies);
    return json({ message: "You were not signed in" }, { status: 200 });
  }
  await revokeAllTokens(localUser.id);
  deleteSessionCookies(cookies);
  return json({ message: "Signed out from all devices successfully" }, { status: 200 });
};
