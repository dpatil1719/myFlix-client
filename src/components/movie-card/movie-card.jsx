// src/components/movie-card/movie-card.jsx
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const title = movie.title;
  const image =
    movie.image || "https://via.placeholder.com/500x750?text=Poster";
  const desc = movie.description || "";

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {desc && (
          <Card.Text className="text-muted">
            {desc.slice(0, 120)}
            {desc.length > 120 ? "…" : ""}
          </Card.Text>
        )}
        <Button variant="primary" onClick={() => onMovieClick(movie)}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};