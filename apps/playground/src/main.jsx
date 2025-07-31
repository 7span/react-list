import { ReactListProvider } from "@7span/react-list";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import requestHandler from "./api/request-handler.js";
import App from "./App.jsx";
import "./index.css";
import readtListOptions from "./components/react-list";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactListProvider config={readtListOptions}>
      <App />
    </ReactListProvider>
  </StrictMode>
);
