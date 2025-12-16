import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../util/endpoints";
import "./personProfile.css";

const PersonProfile = () => {
  const { nconst } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return null;
};