import { json, type RequestHandler } from "@sveltejs/kit";
import { getClearTokenHeaders, revokeRefreshToken } from "$lib/server/auth";

export const POST: RequestHandler = async ({ cookies }) => {
  const refreshToken = cookies.get("refresh_token");
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }
  const headers = getClearTokenHeaders(cookies);
  return json({ message: "ok" }, { status: 200, headers });
};
