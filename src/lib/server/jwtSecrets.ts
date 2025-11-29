import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "$env/static/private";

export const ACCESS_SECRET = new TextEncoder().encode(JWT_ACCESS_SECRET);
export const REFRESH_SECRET = new TextEncoder().encode(JWT_REFRESH_SECRET);
