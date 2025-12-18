import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./home.css";
import useBookmarks from "../../hooks/useBookmarks";
import { useAuthContext } from "../../hooks/useAuth";
import People from "../People/People";
import { useNavigate } from "react-router-dom";

const INTERVAL = 9000;

const loadPoster = async (url) => {
  if (!url) return null;

  const tryLoad = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);
    });

  const xl = url.replace("_SX300", "_SX1000");
  const lg = url.replace("_SX300", "_SX700");

  return (await tryLoad(xl)) || (await tryLoad(lg)) || (await tryLoad(url));
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [bgUrl, setBgUrl] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [toggling, setToggling] = useState(null);

  const cursor = useRef(0);
  const navigate = useNavigate();

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { isAuthenticated } = useAuthContext();

  // Fetch movies once
  useEffect(() => {
    // Fetch all movies, not just Action
    fetch("http://localhost:5000/api/Titles/catalog?type=movie")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && Array.isArray(j.data) && j.data.length > 0) {
          // Only movies with a valid poster
          const withPoster = j.data.filter((m) => m.poster && m.poster !== "N/A");
          // Shuffle for random hero
          const shuffled = withPoster.sort(() => Math.random() - 0.5);
          setMovies(shuffled);
        } else {
          setMovies([]);
        }
      })
      .catch(console.error);
  }, []);

  // Hero rotation
  useEffect(() => {
    if (!movies.length) return;
    let active = true;

    const rotate = async () => {
      let i = cursor.current;

      for (let tries = 0; tries < movies.length; tries++) {
        const poster = await loadPoster(movies[i].poster);
        if (!active) return;

        if (poster) {
          setBgUrl(poster);
          setVisibleIndex(i);
          cursor.current = (i + 1) % movies.length;
          setFadeKey((k) => k + 1);
          break;
        }
        i = (i + 1) % movies.length;
      }

      if (active) setTimeout(rotate, INTERVAL);
    };

    rotate();
    return () => (active = false);
  }, [movies]);

  const handleBookmarkToggle = async (tconst) => {
    if (!isAuthenticated) {
      alert("Please log in to add bookmarks");
      return;
    }

    if (toggling) return;

    try {
      setToggling(tconst);
      await toggleBookmark(tconst);
    } finally {
      setToggling(null);
    }
  };

  if (!bgUrl) {
    return <div className="hero-loader">Loading…</div>;
  }

  const movie = movies[visibleIndex];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div key={fadeKey} className="hero-bg" style={{ backgroundImage: `url(${bgUrl})` }} />

        <div className="hero-content">
          <Container>
            <span className="hero-genre">{movie.genre}</span>
            <h1 className="hero-title">{movie.title}</h1>
            <p className="hero-meta">
              {movie.year} • {movie.type.toUpperCase()}
            </p>

            <div className="hero-actions">
              <button className="btn btn-warning text-white fw-semibold" onClick={() => navigate(`/title/${movie.id}`)}>
                View details
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  // genre slug: lowercased, spaces to dash
                  const genreSlug = movie.genre ? movie.genre.toLowerCase().replace(/\s+/g, "-") : "";
                  navigate(`/catalog/movies/${genreSlug}`);
                }}
              >
                Browse catalog
              </button>
            </div>
          </Container>
        </div>
      </section>

      {/* ============  NEW SECTION: POPULAR ACTORS ============ */}
      <section className="mt-5">
        <People />
      </section>

      {/* MOVIE CAROUSEL */}
      <div className="movie-carousel-wrapper mt-5">
        <h2 className="mb-4">Popular Movies</h2>
        <button className="carousel-chevron left" onClick={() => document.getElementById("movie-carousel-track").scrollBy({ left: -400, behavior: "smooth" })} aria-label="Scroll left">
          ‹
        </button>

        <div id="movie-carousel-track" className="movie-carousel-track">
          {movies.slice(0, 10).map((m) => {
            const bookmarked = isBookmarked(m.id);
            return (
              <div
                key={m.id}
                className="movie-carousel-item"
                onClick={() => navigate(`/title/${m.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/title/${m.id}`);
                }}
              >
                {" "}
                <div className="movie-card">
                  <div className="movie-poster" style={{ backgroundImage: `url(${m.poster})` }} />

                  <div className="movie-info">
                    <span className="movie-title">{m.title}</span>

                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkToggle(m.id);
                      }}
                      disabled={toggling === m.id}
                      aria-label="Bookmark"
                    >
                      {toggling === m.id ? "…" : bookmarked ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-chevron right" onClick={() => document.getElementById("movie-carousel-track").scrollBy({ left: 400, behavior: "smooth" })} aria-label="Scroll right">
          ›
        </button>
      </div>
    </>
  );
};

export default Home;
