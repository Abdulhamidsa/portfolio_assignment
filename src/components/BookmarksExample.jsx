import { useState } from "react";
import { Button, Card, Spinner, Alert } from "react-bootstrap";
import useBookmarks from "../hooks/useBookmarks";
import { useAuthContext } from "../hooks/useAuth";

/**
 * Example component showing how to use the bookmarks hook
 * This demonstrates interaction with protected endpoints
 */
const BookmarksExample = () => {
  const { isAuthenticated } = useAuthContext();
  const { bookmarks, loading, error, toggleBookmark, isBookmarked } = useBookmarks();
  const [toggling, setToggling] = useState(null);

  const handleToggle = async (tconst) => {
    try {
      setToggling(tconst);
      await toggleBookmark(tconst);
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    } finally {
      setToggling(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <Alert variant="info">
        <Alert.Heading>Login Required</Alert.Heading>
        <p>Please log in to view and manage your bookmarks.</p>
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <Card bg="dark" text="light">
        <Card.Header>
          <h3>📚 My Bookmarks</h3>
        </Card.Header>
        <Card.Body>
          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading bookmarks...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger">
              <strong>Error:</strong> {error}
            </Alert>
          )}

          {!loading && !error && bookmarks.length === 0 && <Alert variant="info">No bookmarks yet. Start adding some!</Alert>}

          {!loading && bookmarks.length > 0 && (
            <div className="row g-3">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.tconst} className="col-md-6">
                  <Card bg="secondary" text="light">
                    <Card.Body>
                      <Card.Title>{bookmark.primaryTitle || bookmark.tconst}</Card.Title>
                      <Button variant={isBookmarked(bookmark.tconst) ? "danger" : "success"} size="sm" onClick={() => handleToggle(bookmark.tconst)} disabled={toggling === bookmark.tconst}>
                        {toggling === bookmark.tconst ? <Spinner size="sm" animation="border" /> : isBookmarked(bookmark.tconst) ? "Remove Bookmark" : "Add Bookmark"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Example: Toggle bookmark for a specific title */}
      <Card bg="dark" text="light" className="mt-4">
        <Card.Header>
          <h4>Quick Toggle Example</h4>
        </Card.Header>
        <Card.Body>
          <p>Try toggling bookmark for title: tt37976775 (The Shawshank Redemption)</p>
          <Button variant={isBookmarked("tt37976775") ? "warning" : "primary"} onClick={() => handleToggle("tt37976775")} disabled={toggling === "tt37976775"}>
            {toggling === "tt37976775" ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Processing...
              </>
            ) : isBookmarked("tt37976775") ? (
              "⭐ Bookmarked"
            ) : (
              "☆ Add to Bookmarks"
            )}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookmarksExample;
