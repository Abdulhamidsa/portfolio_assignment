import { useState } from "react";
import useGetMovieById from "../hooks/useGetMovieById";

export default function SearchMovie({ inline = false }) {
  const [idInput, setIdInput] = useState("");
  const [movieId, setMovieId] = useState("");
  const { movie, loading, error } = useGetMovieById(movieId);

  const handleSearch = () => {
    if (!idInput.trim()) return;
    setMovieId(idInput.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  if (inline) {
    return (
      <div className="d-flex align-items-center me-3">
        <input
          type="text"
          className="form-control form-control-sm me-2"
          placeholder="Movie ID"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-sm btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Full-page search layout */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {movie && (
        <div>
          <h5>{movie.title}</h5>
          <p>{movie.description}</p>
        </div>
      )}
    </div>
  );
}
