import { useState } from "react";
import useSearchTitles from "../../hooks/useSearchTitles";
import { Form, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearchTitles(query);

  return (
    <Container>
      <Form.Control type="text" placeholder="Search movies…" value={query} onChange={(e) => setQuery(e.target.value)} className="nav-search-input" />

      {query && (
        <div className="nav-search-dropdown">
          {loading && <Spinner size="sm" />}
          {error && <div className="text-danger">{error}</div>}

          {results.map((title) => (
            <Link key={title.tconst} to={`/title/${title.tconst}`} className="nav-search-item" onClick={() => setQuery("")}>
              <img src={title.poster || "/placeholder-poster.jpg"} />
              <div>
                <div className="title">{title.primaryTitle}</div>
                {title.startYear && <small>{title.startYear}</small>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};
export default SearchPage;
