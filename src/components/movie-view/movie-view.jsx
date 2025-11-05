import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return <div>Movie not found.</div>;

  const fav = isFavorite?.(movie.id);

  return (
    <div>
      <h2 className="mb-3">{movie.title}</h2>
      {movie.image && (
        <img src={movie.image} alt={movie.title} className="mb-3 img-fluid" />
      )}
      <p>{movie.description}</p>
      {movie.genre && (
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
      )}
      {movie.director && (
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
      )}

      <div className="d-flex gap-2 mt-3">
        <Button as={Link} to="/" variant="secondary">
          Back
        </Button>
        {fav ? (
          <Button variant="outline-danger" onClick={() => onRemoveFavorite?.(movie.id)}>
            Remove Favorite
          </Button>
        ) : (
          <Button variant="outline-primary" onClick={() => onAddFavorite?.(movie.id)}>
            Favorite
          </Button>
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFavorite: PropTypes.func,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func
};