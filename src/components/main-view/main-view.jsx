import React, { useState, useEffect } from "react";
import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies] = useState([]);

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

useEffect(() => {
  fetch("https://fierce-beach-67482-2c91e337192e.herokuapp.com")
    .then((response) => response.json())
    .then((data) => {
      setMovies(data);
    })
    .catch((err) => console.error("Error fetching movies:", err));
}, []);