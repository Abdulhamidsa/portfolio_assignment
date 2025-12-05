import { useState, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";

const useGetPersonProfile = (nconst) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nconst) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await fetch(ENDPOINTS.get.GET_PERSON_BY_ID(nconst), {
          credentials: "include", // because you're using JWT cookies
        });

        if (!response.ok) {
          throw new Error("Failed to fetch person profile");
        }

        const data = await response.json();
        setPerson(data.data); // because your API returns {success, message, data}
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [nconst]);

  return { person, loading, error };
};

export default useGetPersonProfile;
