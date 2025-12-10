import React, { useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import useBookmarks from "../../hooks/useBookmarks";
import "./user.css";

const UserBookmark = () => {
  const { bookmarks, loading, error, toggleBookmark } = useBookmarks();
  const [toggling, setToggling] = useState(null);
  console.log(bookmarks);
  const handleToggle = async (tconst) => {
    try {
      setToggling(tconst);
      await toggleBookmark(tconst);
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="bookmark-card">
        <Card.Header className="bookmark-header">
          <h4>My Bookmarks</h4>
        </Card.Header>

        <Card.Body>
          {loading && (
            <div className="bookmark-loading">
              <Spinner animation="border" />
              <p>Loading bookmarks…</p>
            </div>
          )}

          {error && <Alert className="bookmark-alert bookmark-alert-error">{error}</Alert>}

          {!loading && !error && bookmarks.length === 0 && <p className="bookmark-empty">You have no bookmarks yet.</p>}

          {!loading && bookmarks.length > 0 && (
            <div className="row g-4">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.tconst} className="col-md-6 col-lg-4">
                  <Card className="bookmark-item">
                    <Card.Body>
                      <h6 className="bookmark-title">{bookmark.primaryTitle || bookmark.tconst}</h6>

                      <Button className="bookmark-btn" onClick={() => handleToggle(bookmark.tconst)} disabled={toggling === bookmark.tconst}>
                        {toggling === bookmark.tconst ? <Spinner size="sm" /> : "Remove bookmark"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserBookmark;
