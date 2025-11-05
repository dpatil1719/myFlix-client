import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {user && <Nav.Link as={Link} to="/">Home</Nav.Link>}
            {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/login">Log in</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>}
          </Nav>

          {user && (
            <Button variant="outline-secondary" onClick={onLoggedOut}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired
};