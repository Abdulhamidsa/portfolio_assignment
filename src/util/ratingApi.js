import { handleApiResponse } from "./apiFetcher";
import { ENDPOINTS } from "./endpoints";

export const postRating = async (tconst, rating, authenticatedFetch) => {
  if (!authenticatedFetch) {
    throw new Error("Authenticated fetch required for rating");
  }

  const res = await authenticatedFetch(ENDPOINTS.post.POST_RATING(tconst, rating), { method: "POST" });

  return await handleApiResponse(res);
};
