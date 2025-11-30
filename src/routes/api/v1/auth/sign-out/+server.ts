import { json, type RequestHandler } from "@sveltejs/kit";
import * as cookie from "cookie";
import { prisma } from "$lib/server/database";
import { getClearTokenHeaders } from "$lib/server/authTokens";

export const POST: RequestHandler = async ({ request }) => {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const refresh = cookies.refresh_token;
  if (refresh) {
    await prisma.refreshToken.deleteMany({ where: { token: refresh } });
  }
  const headers = getClearTokenHeaders();
  return json({ message: "logged out" }, { status: 200, headers });
};
