import { getCurrentUser } from "$lib/server/auth";

export const load = async ({ cookies }) => {
  const user = await getCurrentUser(cookies);
  return { user };
};
