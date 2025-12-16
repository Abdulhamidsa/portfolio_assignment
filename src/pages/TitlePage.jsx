import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { StarFill, Star, Bookmark, BookmarkFill } from "react-bootstrap-icons";

import useBookmarks from "../hooks/useBookmarks";
import { postRating } from "../util/ratingApi";
import { useAuthContext } from "../hooks/useAuth";

import "../components/browse/title.css";

const TitlePage = () => {
  const { id } = useParams();
  const { authenticatedFetch, isAuthenticated } = useAuthContext();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoverStar, setHoverStar] = useState(null);
  const [userRating, setUserRating] = useState(null); // 1–5

  useEffect(() => {
    fetch(`http://localhost:5000/api/Titles/${id}/basic`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setTitle(json.data);

        if (json.data.userRating) {
          setUserRating(json.data.userRating / 2); // convert 10 → 5 stars
        }

        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Loading…</p>;
  }

  if (!title) {
    return <p className="text-center mt-5">Not found</p>;
  }

  const bookmarked = isBookmarked(id);
  const activeStars = hoverStar ?? userRating;

  return (
    <Container className="py-4">
      <Link to="/browse" className="browse-back">
        ← Browse
      </Link>

      <div className="title-page">
        {/* POSTER */}
        {title.poster && <img src={title.poster} alt={title.primaryTitle} className="title-page-poster" />}

        {/* INFO */}
        <div className="title-page-info">
          <h2>{title.primaryTitle}</h2>

          <div className="meta">
            {title.released?.slice(0, 4)}
            <span className="dot">•</span>
            {title.runtimeMinutes} min
            <span className="dot">•</span>
            {title.titleType}
          </div>

          {title.rating && (
            <div className="rating">
              ⭐ {title.rating.averageRating} / 10
              <span className="dot">•</span>
              {formatVotes(title.rating.numVotes)}
            </div>
          )}

          {title.genres?.length > 0 && (
            <div className="genres">
              {title.genres.map((g) => (
                <span key={g} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="title-actions">
            {isAuthenticated && (
              <button className="action-btn" onClick={() => toggleBookmark(id)}>
                {bookmarked ? <BookmarkFill /> : <Bookmark />}
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            )}
          </div>

          {/* STAR RATING (5 stars → 10 scale) */}
          {isAuthenticated && (
            <div className="star-rating">
              <span className="star-label">Your rating:</span>

              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="star"
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(null)}
                  onClick={async () => {
                    setUserRating(star);
                    await postRating(id, star * 2, authenticatedFetch);
                  }}
                >
                  {activeStars >= star ? <StarFill /> : <Star />}
                </span>
              ))}

              {activeStars && <span className="star-value">{activeStars * 2} / 10</span>}
            </div>
          )}

          {/* PLOT */}
          <p className="plot">{title.plot}</p>

          {/* CAST */}
          {title.people?.length > 0 && (
            <div className="cast">
              <strong>Cast:</strong> {title.people.join(", ")}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

/* =========================
   Helpers
========================= */

function formatVotes(num) {
  if (!num) return "0 votes";
  return num.toLocaleString("en-US") + " votes";
}

export default TitlePage;
