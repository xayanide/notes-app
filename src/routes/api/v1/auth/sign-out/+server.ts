import { json, type RequestHandler } from "@sveltejs/kit";
import { deleteSessionCookies, revokeRefreshToken } from "$lib/server/auth";

export const POST: RequestHandler = async ({ cookies, locals }) => {
  const localUser = locals.user;
  const refreshToken = cookies.get("refresh_token");
  if (!refreshToken || !localUser) {
    deleteSessionCookies(cookies);
    return json({ message: "You were not signed in" }, { status: 200 });
  }
  await revokeRefreshToken(refreshToken);
  deleteSessionCookies(cookies);
  return json({ message: "Signed out successfully" }, { status: 200 });
};
