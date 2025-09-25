const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Poster";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) {
    return null;
  }

  const handleImageError = (event) => {
    event.currentTarget.src = FALLBACK_POSTER;
    event.currentTarget.onerror = null;
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          referrerPolicy="no-referrer"
          onError={handleImageError}
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

