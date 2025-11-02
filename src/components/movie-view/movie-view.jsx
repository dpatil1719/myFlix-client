// src/components/movie-view/movie-view.jsx
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h2 className="h4 mb-3">{movie.title}</h2>

      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          className="img-fluid mb-3"
        />
      )}

      {movie.description && <p className="mb-2">{movie.description}</p>}

      <div className="mb-3">
        {movie.genre && (
          <div>
            <strong>Genre:</strong> {movie.genre}
          </div>
        )}
        {movie.director && (
          <div>
            <strong>Director:</strong> {movie.director}
          </div>
        )}
      </div>

      <Button variant="secondary" onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};