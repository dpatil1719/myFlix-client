import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const ProfileView = ({
  user,
  token,
  movies,
  apiBase,
  onUserChange,
  onLoggedOut,
  onRemoveFavorite
}) => {
  const [form, setForm] = useState({
    Username: user?.Username || "",
    Password: "",
    Email: user?.Email || "",
    Birthday: user?.Birthday?.slice(0, 10) || ""
  });
  const [msg, setMsg] = useState("");

  // Optional: pull fresh user info from the API
  useEffect(() => {
    if (!user?.Username) return;
    // If your API supports GET /users/:Username:
    fetch(`${apiBase}/users/${encodeURIComponent(user.Username)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((fresh) => {
        if (fresh) {
          onUserChange(fresh);
          setForm((f) => ({
            ...f,
            Username: fresh.Username,
            Email: fresh.Email,
            Birthday: fresh.Birthday?.slice(0, 10) || ""
          }));
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    const body = {
      Username: form.Username,
      Email: form.Email,
      Birthday: form.Birthday || undefined,
      ...(form.Password ? { Password: form.Password } : {})
    };
    const res = await fetch(
      `${apiBase}/users/${encodeURIComponent(user.Username)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );
    if (res.ok) {
      const updated = await res.json();
      onUserChange(updated);
      setMsg("Profile updated.");
      setForm((f) => ({ ...f, Password: "" }));
    } else {
      setMsg("Update failed.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete your account? This cannot be undone.")) return;
    const res = await fetch(
      `${apiBase}/users/${encodeURIComponent(user.Username)}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) onLoggedOut();
  };

  const favoriteMovies = movies.filter((m) =>
    (user?.FavoriteMovies || []).includes(m.id)
  );

  return (
    <div>
      <h3 className="mb-3">Your Profile</h3>

      <Form onSubmit={handleUpdate} className="mb-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={form.Username}
                onChange={(e) => setForm({ ...form, Username: e.target.value })}
                required
                minLength={3}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>New Password (optional)</Form.Label>
              <Form.Control
                type="password"
                value={form.Password}
                onChange={(e) => setForm({ ...form, Password: e.target.value })}
                minLength={6}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={form.Birthday}
                onChange={(e) => setForm({ ...form, Birthday: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-3">
          <Button type="submit">Save</Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete account
          </Button>
        </div>

        {msg && <div className="mt-2 text-muted">{msg}</div>}
      </Form>

      <h4 className="mb-3">Favorite Movies</h4>
      {favoriteMovies.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <Row>
          {favoriteMovies.map((m) => (
            <Col key={m.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                {m.image && <Card.Img variant="top" src={m.image} alt={m.title} />}
                <Card.Body>
                  <Card.Title>{m.title}</Card.Title>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onRemoveFavorite(m.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiBase: PropTypes.string.isRequired,
  onUserChange: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired
};