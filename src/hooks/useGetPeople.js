import { useState, useEffect } from "react";
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
        if (response.ok) {
            console.log('Fetch to popular people endpoint succeeded');
        }
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }

        const data = await response.json();
         console.log(data,'this data');
        setPeople(data);
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
