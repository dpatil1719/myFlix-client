import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API_BASE = "https://fierce-beach-67482-2c91e337192e.herokuapp.com";

export const SignupView = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

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
    setErr(""); setOk("");
    const v = validate(); if (v) { setErr(v); return; }

    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username.trim(),
          Password: password,
          Email: email.trim(),
          Birthday: birthday || undefined
        })
      });
      if (!res.ok) { setErr((await res.text()) || "Signup failed."); return; }
      setOk("Account created! You can now log in.");
      setTimeout(() => onSwitchToLogin(), 800);
    } catch {
      setErr("Network error. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="h4 mb-3">Create account</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      {ok  && <div className="alert alert-success">{ok}</div>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="su-username">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="su-password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="su-email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4" controlId="su-birthday">
          <Form.Label>Birthday (optional)</Form.Label>
          <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">Sign up</Button>
          <Button type="button" variant="secondary" onClick={onSwitchToLogin}>Log in</Button>
        </div>
      </Form>
    </div>
  );
};

SignupView.propTypes = { onSwitchToLogin: PropTypes.func.isRequired };