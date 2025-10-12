// src/components/login-view/login-view.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!username.trim() || !password) {
      setErr("Username and password are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username.trim(), Password: password })
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.message || "Login failed");
        return;
      }

      if (!data?.token) {
        setErr("Missing token in response.");
        return;
      }

      localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      onLoggedIn(data.token); // MainView expects token only
    } catch {
      setErr("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <h2>Log in</h2>

      <label>
        Username
        <input
          type="text"
          required
          minLength={3}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}

      <button type="submit" style={{ marginTop: 12 }}>Log in</button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};