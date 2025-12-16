import { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useAuthContext } from "../../hooks/useAuth";
import { publicFetch } from "../../util/apiFetcher";
import { postRating } from "../../util/ratingApi";
import { ENDPOINTS } from "../../util/endpoints";

const RatingControl = ({ value, onChange }) => (
  <div className="rating-control">
    <input type="range" min="1" max="10" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    <div className="rating-value">{value} / 10</div>
  </div>
);

const TitleModal = ({ tconst, show, onHide }) => {
  const { authenticatedFetch, isAuthenticated } = useAuthContext();

  const [title, setTitle] = useState(null);
  const [draftRating, setDraftRating] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!show || !tconst) return;

    let active = true;

    const load = async () => {
      try {
        const res = await publicFetch(ENDPOINTS.get.GET_TITLE_BY_ID(tconst) + "/basic");
        const json = await res.json();

        if (active && json?.success) {
          setTitle(json.data);
        }
      } catch (err) {
        console.error("Failed to load title", err);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [show, tconst]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to rate");
      return;
    }

    setSaving(true);
    try {
      await postRating(tconst, draftRating, authenticatedFetch);
      onHide();
    } catch (err) {
      alert("Failed to submit rating", err.message || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body>
        {!title ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="d-flex gap-4">
            <img src={title.poster} alt={title.primaryTitle} style={{ width: 220, borderRadius: 10 }} />

            <div className="flex-grow-1">
              <h3>{title.primaryTitle}</h3>

              <div className="text-muted mb-3">
                {title.startYear} • {title.titleType}
              </div>

              <label>Your rating</label>
              <RatingControl value={draftRating} onChange={setDraftRating} />

              <Button className="mt-3" onClick={handleSave} disabled={saving || draftRating === 0}>
                {saving ? "Saving…" : "Save rating"}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TitleModal;
