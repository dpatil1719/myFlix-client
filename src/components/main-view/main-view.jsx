// src/components/main-view/main-view.jsx
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";
  
    fetch(`${API_BASE}/movies`)
      .then((response) => response.json())
      .then((data) => {
        const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

setMovies(
  data.map((m) => ({
    id: m._id,
    title: m.Title,
    description: m.Description,
    image: m.ImagePath?.startsWith("http")
      ? m.ImagePath
      : `${API_BASE}${m.ImagePath}`,
    genre: m.Genre?.Name,
    director: m.Director?.Name
  }))
);
      });
  }, []);

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
      <h1>Movie List</h1>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(m) => setSelectedMovie(m)}
        />
      ))}
    </div>
  );
};