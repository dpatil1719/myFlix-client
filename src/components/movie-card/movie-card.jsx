import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, onMovieClick }) => (
  <Card className="h-100">
    {movie.image && <Card.Img variant="top" src={movie.image} alt={movie.title} />}
    <Card.Body>
      <Card.Title className="h6 mb-2">{movie.title}</Card.Title>
      {movie.genre && <Card.Text className="text-muted mb-3">{movie.genre}</Card.Text>}
      <Button variant="primary" onClick={() => onMovieClick(movie)}>Open</Button>
    </Card.Body>
  </Card>
);

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