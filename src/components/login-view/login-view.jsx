import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!username.trim() || !password) { setErr("Username and password are required."); return; }

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username.trim(), Password: password })
      });
      const data = await res.json();
      if (!res.ok || !data?.token) { setErr(data?.message || "Login failed"); return; }
      localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      onLoggedIn(data.token);
    } catch {
      setErr("Network error. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="h4 mb-3">Log in</h2>
      {err && <div className="alert alert-danger">{err}</div>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="login-username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text" required minLength={3}
            value={username} onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="login-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" required minLength={6}
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>

        <Button type="submit" variant="primary">Log in</Button>
      </Form>
    </div>
  );
};

LoginView.propTypes = { onLoggedIn: PropTypes.func.isRequired };