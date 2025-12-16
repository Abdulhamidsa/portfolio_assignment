import { useState, useEffect } from "react";
import { fetchPersonImage } from "../api/tmdb";
import { ENDPOINTS } from "../util/endpoints";
const useGetPeople = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const response = await fetch(ENDPOINTS.get.GET_POPULAR_PEOPLE);
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        const basePeople = await response.json();

        // Add images from TMDB
        const enrichedPeople = await Promise.all(
          basePeople.map(async (p) => {
            const photoUrl = await fetchPersonImage(p.nconst);
            return { ...p, photoUrl };
          })
        );
        console.log("Enriched People:", enrichedPeople);

        setPeople(enrichedPeople);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return { people, loading, error };
};

export default useGetPeople;
