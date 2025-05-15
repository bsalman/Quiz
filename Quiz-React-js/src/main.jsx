import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./context/subjects";
// import "./index.css";
import "./scss/style.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);
