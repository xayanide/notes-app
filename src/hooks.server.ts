import { getCurrentUserOrRefresh } from "$lib/server/auth";

export const handle = async ({ event, resolve }) => {
  event.locals.user = (await getCurrentUserOrRefresh(event.cookies)) ?? undefined;
  return await resolve(event);
};
