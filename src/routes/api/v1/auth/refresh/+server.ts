import { json, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/database";
import * as cookie from "cookie";
import { verifyRefreshToken, createAccessToken, rotateRefreshToken } from "$lib/server/auth";
import { getNewTokenHeaders } from "$lib/server/auth";

export const POST: RequestHandler = async ({ request }) => {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const refreshToken = cookies.refresh_token;
  if (!refreshToken) {
    return json(null, { status: 401 });
  }
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) {
    return json(null, { status: 401 });
  }
  const tokenRow = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  // token not found in db or expired so do not issue new tokens
  if (!tokenRow || tokenRow.expiresAt < new Date()) {
    return json(null, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    return json(null, { status: 401 });
  }
  // createRefreshToken in rotateRefreshToken persists and saves it
  const newRefreshToken = await rotateRefreshToken(refreshToken, user);
  const newAccessToken = await createAccessToken(user);
  const headers = getNewTokenHeaders(newAccessToken, newRefreshToken);
  return json({ message: "refreshed" }, { status: 200, headers });
};
