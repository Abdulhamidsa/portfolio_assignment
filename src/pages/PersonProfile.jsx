import { useParams } from "react-router-dom";
import useGetPersonProfile from "../hooks/useGetPersonProfile";

export default function PersonProfile() {
  const { nconst } = useParams();
  const { person, loading, error } = useGetPersonProfile(nconst);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!person) return <p>No data found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{person.name}</h1>

      {person.photoUrl && (
        <img
          src={person.photoUrl}
          alt={person.name}
          style={{ width: "200px", borderRadius: "10px" }}
        />
      )}

      <p><strong>Birth Year:</strong> {person.birthYear ?? "Unknown"}</p>
      <p><strong>Death Year:</strong> {person.deathYear ?? "Still alive"}</p>
      <p><strong>Professions:</strong> {person.professions}</p>
      <p><strong>Rating:</strong> {person.rating}</p>
      <p><strong>Total Votes:</strong> {person.totalVotes}</p>

      <h3>Known For</h3>
      <p>{person.knownFor}</p>

      <h3>Biography</h3>
      <p>{person.bio}</p>
    </div>
  );
}
