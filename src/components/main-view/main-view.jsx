import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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
    if (!token) return;
    const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";
    setLoading(true);
    setError("");
    fetch(`${API_BASE}/movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("token"); localStorage.removeItem("user");
          setToken(null); throw new Error("Unauthorized");
        }
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) { setMovies([]); setError("Unexpected response."); return; }
        setMovies(data.map((m) => ({
          id: m._id,
          title: m.Title,
          description: m.Description,
          image: m.ImagePath?.startsWith("http") ? m.ImagePath : `${API_BASE}${m.ImagePath}`,
          genre: m.Genre?.Name, director: m.Director?.Name
        })));
      })
      .catch((e) => { if (e.message !== "Unauthorized") setError("Failed to load movies."); })
      .finally(() => setLoading(false));
  }, [token]);

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
                <Button variant="link" onClick={() => setShowSignup(true)}>Sign up</Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Movie List</h1>
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem("token"); localStorage.removeItem("user");
            setSelectedMovie(null); setMovies([]); setToken(null);
          }}>
          Log out
        </Button>
      </div>

      {loading && <div className="d-flex justify-content-center my-5"><Spinner /></div>}
      {!loading && error && <div className="text-danger mb-3">{error}</div>}
      {!loading && !error && movies.length === 0 && <div>No movies yet.</div>}

      {!loading && !error && movies.length > 0 && (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-5">
              <MovieCard movie={movie} onMovieClick={(m) => setSelectedMovie(m)} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};