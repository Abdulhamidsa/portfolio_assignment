import { useRef, useState, useEffect } from "react";
import useGetPeople from "../../hooks/useGetPeople";
import "./people.css";

const ITEMS_PER_PAGE = 6;

const People = () => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const { people, loading, error } = useGetPeople();

  return null;
};