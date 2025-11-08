// src/components/movie-view/movie-view.jsx
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const fav = isFavorite ? isFavorite(movie.id) : false;

  return (
    <div>
      <h2 className="mb-3">{movie.title}</h2>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          className="img-fluid mb-3"
          style={{ maxHeight: 420, objectFit: "cover" }}
        />
      )}

      <p className="mb-2">{movie.description}</p>
      {movie.genre && (
        <p className="mb-1">
          <strong>Genre:</strong> {movie.genre}
        </p>
      )}
      {movie.director && (
        <p className="mb-3">
          <strong>Director:</strong> {movie.director}
        </p>
      )}

      <div className="d-flex gap-2">
        <Button as={Link} to="/" variant="secondary">
          Back
        </Button>
        {fav ? (
          <Button variant="outline-danger" onClick={() => onRemoveFavorite(movie.id)}>
            Remove Favorite
          </Button>
        ) : (
          <Button onClick={() => onAddFavorite(movie.id)}>Add Favorite</Button>
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  isFavorite: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired
};