// src/index.jsx
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS first
import "./index.scss";                         // then your custom styles
import Container from "react-bootstrap/Container";
import { MainView } from "./components/main-view/main-view";

const MyFlixApplication = () => (
  <Container className="py-4">
    <MainView />
  </Container>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyFlixApplication />);