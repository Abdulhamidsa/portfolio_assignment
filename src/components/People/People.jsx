import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import useGetPeople from "../../hooks/useGetPeople";
import "./people.css";

const ITEMS_PER_PAGE = 6;

const People = () => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const { people, loading, error } = useGetPeople();

  const navigate = useNavigate(); 

  // Calculate card width dynamically
  useEffect(() => {
    const firstCard = scrollRef.current?.querySelector(".actor-card");
    if (firstCard) {
      setCardWidth(firstCard.offsetWidth + 40); // card + gap
    }
  }, [people]);

  if (loading) return null;
  if (error) return null;
  if (!people?.length) return null;

  const totalPages = Math.ceil(people.length / ITEMS_PER_PAGE);

  const scrollToPage = (newPage) => {
    const scrollAmount = newPage * ITEMS_PER_PAGE * cardWidth;
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const next = () => {
    if (page < totalPages - 1) {
      const newPage = page + 1;
      setPage(newPage);
      scrollToPage(newPage);
    }
  };

  const prev = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      scrollToPage(newPage);
    }
  };

  return (
    <>
      {/* SECTION LABELS */}
      <div className="labels-row">
        <div className="label">Popular Actors</div>
      </div>

      {/* SLIDER */}
      <div className="scroll-container">
        <button className="arrow left" onClick={prev} disabled={page === 0}>
          ◀
        </button>

        <div className="scroll-row" ref={scrollRef}>
          {people.map((p) => (
            <div
              key={p.id || p.nconst}
              className="actor-card"
              onClick={() => navigate(`/people/${p.nconst}`)} 
              style={{ cursor: "pointer" }}                  
            >
              <img
                src={p.photoUrl || p.photo}
                alt={p.name}
                className="actor-card-img"
              />

              <div className="rank">{p.name}</div>

              {p.age && <div className="rank">Age: {p.age}</div>}

              {p.rating && (
                <div className="rank">
                  Rating: <span>{p.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="arrow right"
          onClick={next}
          disabled={page === totalPages - 1}
        >
          ▶
        </button>
      </div>
    </>
  );
};

export default People;
