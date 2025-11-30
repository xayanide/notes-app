import { dev } from "$app/environment";
import * as cookie from "cookie";
import { ACCESS_EXPIRES_SECONDS, REFRESH_EXPIRES_SECONDS } from "./auth";

export function getNewTokenHeaders(acessToken: string, refreshToken: string) {
  const isProduction = dev === false;
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    cookie.serialize("access_token", acessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_EXPIRES_SECONDS,
    }),
  );
  headers.append(
    "Set-Cookie",
    cookie.serialize("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_EXPIRES_SECONDS,
    }),
  );
  return headers;
}

export function getClearTokenHeaders() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    cookie.serialize("access_token", "", { httpOnly: true, path: "/", maxAge: 0 }),
  );
  headers.append(
    "Set-Cookie",
    cookie.serialize("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 }),
  );
  return headers;
}
