import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller about dream invasion.",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
    },
    {
      id: 2,
      title: "The Matrix",
      description: "A hacker discovers the reality is a simulation.",
      genre: "Science Fiction",
      director: "The Wachowskis",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A journey through space and time to save humanity.",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_UF894,1000_QL80_.jpg"
    }
  ]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <h2>Movie List</h2>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
