import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <Card>
      {movie.image && <Card.Img variant="top" src={movie.image} alt={movie.title} />}
      <Card.Body>
        <Card.Title className="h4">{movie.title}</Card.Title>
        {movie.description && <Card.Text className="mb-3">{movie.description}</Card.Text>}
        {movie.genre && <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>}
        {movie.director && <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>}
        <Button variant="link" onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};