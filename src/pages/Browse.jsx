import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Film, Tv, LightningFill, HeartFill, EmojiLaughing, EmojiDizzy, Compass, Search } from "react-bootstrap-icons";

import { BROWSE_TYPES, PRIMARY_GENRES } from "../util/slugMap";

import "../components/browse/title.css";

const TYPE_ICONS = {
  movies: <Film size={34} />,
  tv: <Tv size={34} />,
};

const GENRE_ICONS = {
  action: <LightningFill size={30} />,
  drama: <HeartFill size={30} />,
  comedy: <EmojiLaughing size={30} />,
  horror: <EmojiDizzy size={30} />,
  thriller: <Search size={30} />,
  crime: <Search size={30} />,
  romance: <HeartFill size={30} />,
  "sci-fi": <Compass size={30} />,
  adventure: <Compass size={30} />,
};

const Browse = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Browse</h2>

      {/* BY TYPE */}
      <h5 className="browse-section-title">By Type</h5>
      <Row className="mb-5">
        {Object.keys(BROWSE_TYPES).map((key) => (
          <Col md={6} className="mb-4" key={key}>
            <Card className="browse-card" onClick={() => navigate(`/catalog/${key}`)}>
              <Card.Body className="browse-card-body">
                <div className="browse-icon">{TYPE_ICONS[key]}</div>
                <Card.Title className="browse-title">{key === "tv" ? "TV Series" : "Movies"}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* BY GENRE */}
      <h5 className="browse-section-title">By Genre</h5>
      <Row>
        {PRIMARY_GENRES.map((genre) => (
          <Col md={3} className="mb-4" key={genre}>
            <Card className="browse-card" onClick={() => navigate(`/catalog/movies/${genre}`)}>
              <Card.Body className="browse-card-body">
                <div className="browse-icon">{GENRE_ICONS[genre]}</div>
                <Card.Title className="browse-title">{genre.replace("-", " ").toUpperCase()}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Browse;
