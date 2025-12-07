import React from "react";
import useBookmarks from "../hooks/useBookmarks";

const Bookmarks = () => {
  const { bookmarks, loading, error, toggleBookmark } = useBookmarks();

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul>
          {bookmarks.map((item) => (
            <li key={item.tconst}>
              {item.title}{" "}
              <button onClick={() => toggleBookmark(item.tconst)}>
                Toggle
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
