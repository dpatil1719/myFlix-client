// src/components/main-view/main-view.jsx
import { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

export const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser]   = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Refresh user from localStorage whenever token changes (after login)
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, [token]);

  // Load movies when authenticated
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError("");
    fetch(`${API_BASE}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.clear();
          setUser(null);
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
            image: m.ImagePath?.startsWith("http")
              ? m.ImagePath
              : `${API_BASE}${m.ImagePath}`,
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

  // Favorite helpers — update API then local user state
  const addFavorite = async (movieId) => {
    if (!user || !token) return;
    await fetch(`${API_BASE}/users/${encodeURIComponent(user.Username)}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = {
      ...user,
      FavoriteMovies: Array.from(new Set([...(user.FavoriteMovies || []), movieId]))
    };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const removeFavorite = async (movieId) => {
    if (!user || !token) return;
    await fetch(`${API_BASE}/users/${encodeURIComponent(user.Username)}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = {
      ...user,
      FavoriteMovies: (user.FavoriteMovies || []).filter((id) => id !== movieId)
    };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const onLoggedOut = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setMovies([]);
  };

  const isAuthed = useMemo(() => Boolean(token), [token]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />

      <Row className="justify-content-md-center">
        <Routes>
          {/* Sign up */}
          <Route
            path="/signup"
            element={
              isAuthed ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView onSwitchToLogin={() => (window.location.href = "/login")} />
                </Col>
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              isAuthed ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(t) => setToken(t)} />
                </Col>
              )
            }
          />

          {/* Profile (authenticated only) */}
          <Route
            path="/profile"
            element={
              !isAuthed ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onUserChange={(u) => {
                      setUser(u);
                      localStorage.setItem("user", JSON.stringify(u));
                    }}
                    onLoggedOut={onLoggedOut}
                    apiBase={API_BASE}
                    onRemoveFavorite={removeFavorite}
                  />
                </Col>
              )
            }
          />

          {/* Single movie (authenticated only) */}
          <Route
            path="/movies/:movieId"
            element={
              !isAuthed ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    isFavorite={(id) => (user?.FavoriteMovies || []).includes(id)}
                    onAddFavorite={addFavorite}
                    onRemoveFavorite={removeFavorite}
                  />
                </Col>
              )
            }
          />

          {/* Home — grid of cards (authenticated only) */}
          <Route
            path="/"
            element={
              !isAuthed ? (
                <Navigate to="/login" replace />
              ) : loading ? (
                <Col className="text-center my-5">
                  <Spinner />
                </Col>
              ) : error ? (
                <Col className="text-danger">{error}</Col>
              ) : movies.length === 0 ? (
                <Col>No movies yet.</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-5">
                      <MovieCard
                        movie={movie}
                        isFavorite={(user?.FavoriteMovies || []).includes(movie.id)}
                        onAddFavorite={() => addFavorite(movie.id)}
                        onRemoveFavorite={() => removeFavorite(movie.id)}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};