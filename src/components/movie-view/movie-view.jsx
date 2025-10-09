import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) {
    return null;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
        />
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: MovieCard.propTypes.movie,   
  onBackClick: PropTypes.func.isRequired
};