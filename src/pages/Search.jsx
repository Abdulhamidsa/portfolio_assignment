import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const apiKey = "YOUR_OMDB_API_KEY"; // <-- put your key

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    );

    const data = await res.json();

    if (data.Search) {
      setResults(data.Search);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Movies</h2>

      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="mt-4">
        {results.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} width="100" />
            <p>{movie.Title} ({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
