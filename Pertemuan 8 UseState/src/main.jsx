import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Pokemon from "./Pokemon";
// import Effect from "./Effect";
// import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pokemon />
  </StrictMode>,
);
