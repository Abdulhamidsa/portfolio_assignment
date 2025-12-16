const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export async function fetchPersonImage(nconst) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/find/${nconst}?external_source=imdb_id&api_key=${TMDB_KEY}`);

    if (!res.ok) return null;

    const data = await res.json();

    const person = data?.person_results?.[0];
    if (!person || !person.profile_path) return null;

    return `${TMDB_IMAGE_BASE}${person.profile_path}`;
  } catch {
    return null;
  }
}
