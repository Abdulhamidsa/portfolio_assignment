
import { useRef, useState, useEffect } from "react";
import useGetPeople from "../../hooks/useGetPeople";
import "./people.css";
const ITEMS_PER_PAGE = 6;
const People = () => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const { people, loading, error } = useGetPeople();
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
   return null;