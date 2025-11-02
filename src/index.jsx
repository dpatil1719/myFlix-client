import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";   
import "./index.scss";
import { MainView } from "./components/main-view/main-view";

const MyFlixApplication = () => (
  <div className="my-flix">
    <MainView />
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyFlixApplication />);
