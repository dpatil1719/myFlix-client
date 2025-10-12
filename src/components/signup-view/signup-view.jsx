// src/components/signup-view/signup-view.jsx
import { useState } from "react";
import PropTypes from "prop-types";


const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

export const SignupView = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail]       = useState("");
  const [birthday, setBirthday] = useState(""); // yyyy-mm-dd
  const [err, setErr]           = useState("");
  const [ok, setOk]             = useState("");

  const validate = () => {
    if (!username.trim()) return "Username is required.";
    if (username.trim().length < 3) return "Username must be at least 3 characters.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username.trim(),
          Password: password,
          Email: email.trim(),
          Birthday: birthday || undefined // optional on backend
        })
      });

      if (!res.ok) {
        const text = await res.text();
        setErr(text || "Signup failed.");
        return;
      }

      setOk("Account created! You can now log in.");
      // After a short pause, switch to login
      setTimeout(() => onSwitchToLogin(), 800);
    } catch {
      setErr("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <h2>Create account</h2>

      <label>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>

      <label>
        Birthday (optional)
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>

      {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
      {ok  && <div style={{ color: "green", marginTop: 8 }}>{ok}</div>}

      <button type="submit" style={{ marginTop: 12 }}>Sign up</button>

      <div style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Log in
        </button>
      </div>
    </form>
  );
};

SignupView.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired
};

