import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies }) => {
  const headers = new Headers();
  headers.set("Location", "/sign-in");
  headers.append("Set-Cookie", cookies.serialize("access_token", "", { maxAge: 0, path: "/" }));
  headers.append("Set-Cookie", cookies.serialize("refresh_token", "", { maxAge: 0, path: "/" }));
  return json("signed out", { status: 302, headers });
};
