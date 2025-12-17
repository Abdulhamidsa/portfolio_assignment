import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Spinner, Modal } from "react-bootstrap";
import useBookmarks from "../../hooks/useBookmarks";
import { publicFetch, handleApiResponse } from "../../util/apiFetcher";
import { ENDPOINTS } from "../../util/endpoints";
import "./user.css";

const UserBookmark = () => {
  const { bookmarks, loading, error, toggleBookmark } = useBookmarks();
  const [toggling, setToggling] = useState(null);
  const [selected, setSelected] = useState(null);

  // adding bookmarks with backend details 
  const [enriched, setEnriched] = useState([]);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const enrichedData = await Promise.all(
          bookmarks.map(async (b) => {
            try {
              const res = await publicFetch(ENDPOINTS.get.GET_TITLE_BY_ID(b.tconst) + "/basic");
              const details = await handleApiResponse(res);
              return { ...b, ...details };
            } catch {
              return b;
            }
          })
        );
        setEnriched(enrichedData);
      } catch {
        setEnriched(bookmarks);
      }
    };
    if (bookmarks.length > 0) loadDetails();
  }, [bookmarks]);

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
      <h4 className="mb-4">My Bookmarks</h4>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading…</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && enriched.length === 0 && (
        <p>You have no bookmarks yet.</p>
      )}

      {!loading && !error && enriched.length > 0 && (
        <div className="row g-4">
          {enriched.map((bookmark) => (
            <div key={bookmark.tconst} className="col-md-6 col-lg-4">
              <Card
                className="h-100"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(bookmark)}
              >
                <Card.Img
                  variant="top"
                  src={bookmark.poster || "https://via.placeholder.com/300x450"}
                  alt={bookmark.primaryTitle}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{bookmark.primaryTitle}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {bookmark.startYear || "N/A"} <br />
                    <strong>Type:</strong> {bookmark.titleType || "N/A"} <br />
                    <strong>Rating:</strong> ⭐ {bookmark.averageRating || "N/A"}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(bookmark.tconst);
                      }}
                      disabled={toggling === bookmark.tconst}
                    >
                      {toggling === bookmark.tconst ? <Spinner size="sm" /> : "Remove"}
                    </Button>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(bookmark);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Modal popup */}
      {selected && (
        <Modal show onHide={() => setSelected(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selected.primaryTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selected.poster || "https://via.placeholder.com/300x450"}
              alt={selected.primaryTitle}
              className="img-fluid mb-3"
            />
            <p><strong>Year:</strong> {selected.startYear || "N/A"}</p>
            <p><strong>Type:</strong> {selected.titleType || "N/A"}</p>
            <p><strong>Description:</strong> {selected.plot || "No description available."}</p>
            <p><strong>Rating:</strong> ⭐ {selected.averageRating || "N/A"}</p>
            {selected.people?.length > 0 && (
              <p><strong>Cast:</strong> {selected.people.join(", ")}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserBookmark;
