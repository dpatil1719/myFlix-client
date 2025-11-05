import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  return (
    <Card className="h-100">
      {movie.image && <Card.Img variant="top" src={movie.image} alt={movie.title} />}
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        {movie.genre && <Card.Text className="mb-2 text-muted">{movie.genre}</Card.Text>}

        <div className="d-flex gap-2">
          <Button as={Link} to={`/movies/${encodeURIComponent(movie.id)}`} variant="link">
            Open
          </Button>

          {isFavorite ? (
            <Button size="sm" variant="outline-danger" onClick={onRemoveFavorite}>
              Remove Favorite
            </Button>
          ) : (
            <Button size="sm" variant="outline-primary" onClick={onAddFavorite}>
              Favorite
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
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  isFavorite: PropTypes.bool,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func
};