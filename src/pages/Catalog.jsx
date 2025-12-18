import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { BROWSE_TYPES } from "../util/slugMap";

import "../components/browse/title.css";

const Catalog = () => {
  const { type, genre } = useParams();
  const navigate = useNavigate();

  const apiType = BROWSE_TYPES[type];
  const apiGenre = genre ? genreToImdb(genre) : null;

  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (!apiType) return;

    let url = `http://localhost:5000/api/Titles/catalog?type=${apiType}`;
    if (apiGenre) url += `&genre=${apiGenre}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success || !Array.isArray(json.data)) {
          console.error("Invalid catalog response:", json);
          setTitles([]);
          return;
        }

        setTitles(json.data);
      })
      .catch((err) => {
        console.error("Catalog fetch failed:", err);
        setTitles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiType, apiGenre]);

  if (!apiType) {
    return <h3 className="text-center mt-5">Not Found</h3>;
  }

  // remove titles without posters
  const cleanTitles = titles.filter((t) => t.poster && t.poster !== "N/A");

  return (
    <Container className="py-4">
      <Link to="/browse" className="browse-back">
        ← Browse
      </Link>

      <h2 className="mb-4 text-capitalize">{genre ? `${formatLabel(genre)} ${type}` : type}</h2>

      {loading ? (
        <p className="text-center">Loading…</p>
      ) : (
        <>
          <div className="titles-grid">
            {cleanTitles.slice(0, visibleCount).map((item) => (
              <TitleCard key={item.id} item={item} onClick={() => navigate(`/title/${item.id}`)} />
            ))}
          </div>

          {visibleCount < cleanTitles.length && (
            <div className="load-more-wrap text-center mt-4">
              <button className="load-more-btn" onClick={() => setVisibleCount((prev) => prev + 10)}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

/* =========================
   Title Card
========================= */

const TitleCard = ({ item, onClick }) => {
  const [visible, setVisible] = useState(true);
  console.log(item);

  if (!visible) return null;

  return (
    <div className="title-card" onClick={onClick}>
      <img className="poster" src={item.poster} alt={item.title} onError={() => setVisible(false)} />

      <div className="info">
        <h5 className="name">{item.title}</h5>
        <div className="meta">
          {item.year}
          <span className="dot">•</span>
          {item.type}
        </div>
      </div>
    </div>
  );
};

/* =========================
   Helpers
========================= */

// convert URL genre → IMDb genre
function genreToImdb(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

// prettier title
function formatLabel(slug) {
  return slug.replace("-", " ").toUpperCase();
}

export default Catalog;
