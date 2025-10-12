import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.image && <img src={movie.image} alt={movie.title} />}
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,          // matches your API mapping (_id → string)
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};