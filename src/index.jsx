import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";   // keep simple import
import "./index.scss";

import Container from "react-bootstrap/Container";
import { MainView } from "./components/main-view/main-view";

const MyFlixApplication = () => (
  <Container className="my-flix min-vh-100 py-5">
    <MainView />
  </Container>
);

const root = createRoot(document.getElementById("root"));
root.render(<MyFlixApplication />);







