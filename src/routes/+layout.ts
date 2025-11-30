import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const res = await event.fetch("/api/v1/me");
  if (!res.ok) {
    return { user: null };
  }
  return { user: await res.json() };
};
