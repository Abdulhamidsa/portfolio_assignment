import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../util/endpoints";
import "./personProfile.css";

const PersonProfile = () => {
  const { nconst } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const res = await fetch(ENDPOINTS.get.GET_PERSON_BY_ID(nconst));

        if (!res.ok) {
          throw new Error("Failed to fetch person");
        }

        const data = await res.json();
        setPerson(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [nconst]);

  if (loading) return <div className="page">Loading…</div>;
  if (error) return <div className="page">{error}</div>;
  if (!person) return <div className="page">Person not found</div>;

  return (
    <div className="page person-page">
      {/* Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className="person-header">
        <img
          src={person.photoUrl}
          alt={person.name}
          className="person-photo"
        />

        <div className="person-info">
          <h1>{person.name}</h1>

          <div className="professions">{person.professions}</div>

          <div className="meta">
            Born: {person.birthYear}
            {person.deathYear && ` – ${person.deathYear}`}
          </div>

          <div className="rating">
            ⭐ {person.rating}{" "}
            <span className="votes">
              ({person.totalVotes?.toLocaleString()} votes)
            </span>
          </div>

          <div className="known-for">
            <strong>Known for:</strong> {person.knownFor}
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="section">
        <h2>Biography</h2>
        <p>{person.bio}</p>
      </div>

      {/* Awards */}
      <div className="section">
        <h2>Awards</h2>
        <p>{person.awards}</p>
      </div>
    </div>
  );
};

export default PersonProfile;
