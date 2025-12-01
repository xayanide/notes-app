import { getCurrentUser, refreshAccessToken } from "$lib/server/auth";

export const handle = async ({ event, resolve }) => {
  const cookies = event.cookies;
  const user = await getCurrentUser(cookies);
  if (user) {
    event.locals.user = user;
    return await resolve(event);
  }
  const refreshedUser = await refreshAccessToken(cookies);
  if (refreshedUser) {
    event.locals.user = refreshedUser;
    return await resolve(event);
  }
  return await resolve(event);
};
