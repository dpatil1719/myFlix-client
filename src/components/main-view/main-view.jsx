// src/components/main-view/main-view.jsx
import { useState, useEffect } from "react";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Don't fetch until we're logged in
    if (!token) return;

    const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";
    setLoading(true);
    setError("");

    fetch(`${API_BASE}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.status === 401) {
          // Token invalid/expired: clear and show login again
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setMovies([]);
          setError("Unexpected response from server.");
          return;
        }
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
      })
      .catch((e) => {
        console.error(e);
        if (e.message !== "Unauthorized") {
          setError("Failed to load movies.");
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  // If not authenticated yet, show login/signup
  if (!token) {
    return (
      <div>
        {showSignup ? (
          <SignupView onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <>
            <LoginView onLoggedIn={setToken} />
            <div style={{ marginTop: 10 }}>
              Don’t have an account?{" "}
              <button type="button" onClick={() => setShowSignup(true)}>
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // If a movie is selected, show its detail view
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // Otherwise show the list
  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setSelectedMovie(null);
          setMovies([]);
          setToken(null); // this will show LoginView again
        }}
        style={{ marginBottom: 12 }}
      >
        Log out
      </button>

      <h1>Movie List</h1>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && movies.length === 0 && <div>No movies yet.</div>}

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