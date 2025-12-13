// src/components/main-view/main-view.jsx
import { useState, useEffect, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

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

  // ----- Filter state & derived lists -----
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");

  // Build unique genre list from normalized movie objects
  const genres = useMemo(() => {
    const set = new Set((movies || []).map((m) => m.genre).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [movies]);

  // Apply search + genre filters
  const visibleMovies = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (movies || []).filter((m) => {
      const title = (m.title ?? "").toLowerCase();
      const gname = (m.genre ?? "").toLowerCase();
      const titleMatch = !q || title.includes(q);
      const genreMatch = genre === "all" || gname === genre.toLowerCase();
      return titleMatch && genreMatch;
    });
  }, [movies, query, genre]);

  useEffect(() => {
    if (!token) return;

    const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";
    setLoading(true);
    setError("");

    fetch(`${API_BASE}/movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          throw new Error("Unauthorized");
        }
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setMovies([]);
          setError("Unexpected response.");
          return;
        }
        setMovies(
          data.map((m) => ({
            id: m._id,
            title: m.Title,
            description: m.Description,
            image: (() => {
              const raw = m.ImagePath || "";
              if (!raw) return null;
              try {
                // Resolves absolute URLs unchanged, and fixes /relative or relative paths against API_BASE
                return new URL(raw, API_BASE).toString();
              } catch {
                return null;
              }
            })(),
            genre: m.Genre?.Name,
            director: m.Director?.Name
          }))
        );
      })
      .catch((e) => {
        if (e.message !== "Unauthorized") setError("Failed to load movies.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Login / Signup
  if (!token) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          {showSignup ? (
            <SignupView onSwitchToLogin={() => setShowSignup(false)} />
          ) : (
            <>
              <LoginView onLoggedIn={(t) => setToken(t)} />
              <div className="text-center mt-3">
                Don’t have an account?{" "}
                <Button variant="link" onClick={() => setShowSignup(true)}>
                  Sign up
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    );
  }

  // Detail view
  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      </Row>
    );
  }

  // List view
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Movie List</h1>
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setSelectedMovie(null);
            setMovies([]);
            setToken(null);
          }}
        >
          Log out
        </Button>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search movies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="form-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ maxWidth: 220 }}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <Button
          variant="outline-secondary"
          onClick={() => {
            setQuery("");
            setGenre("all");
          }}
        >
          Clear
        </Button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading…</span>
          </Spinner>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {!loading && !error && movies.length === 0 && <div>No movies yet.</div>}

      {!loading && !error && movies.length > 0 && visibleMovies.length === 0 && (
        <div>No movies match your filters.</div>
      )}

      {!loading && !error && visibleMovies.length > 0 && (
        <Row className="g-4">
          {visibleMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} onMovieClick={(m) => setSelectedMovie(m)} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};