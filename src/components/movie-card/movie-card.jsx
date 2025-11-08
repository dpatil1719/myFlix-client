// src/components/movie-card/movie-card.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  return (
    <Card className="h-100">
      {movie.image && <Card.Img variant="top" src={movie.image} alt={movie.title} />}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        {movie.genre && (
          <Card.Text className="text-muted mb-3">Genre: {movie.genre}</Card.Text>
        )}

        <div className="mt-auto d-flex gap-2 align-items-center">
          <Button as={Link} to={`/movies/${movie.id}`} variant="link">
            Open
          </Button>

          {isFavorite ? (
            <Button size="sm" variant="outline-danger" onClick={onRemoveFavorite}>
              Remove Favorite
            </Button>
          ) : (
            <Button size="sm" onClick={onAddFavorite}>
              Add Favorite
            </Button>
          )}
        </div>
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
  isFavorite: PropTypes.bool,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired
};