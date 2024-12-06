import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./i18n";
import { initializeReCaptcha } from "./utils/ReCaptchaLoader.js";

initializeReCaptcha()
  .then(() => {
    console.log("reCAPTCHA script loaded successfully.");
  })
  .catch((error) => {
    console.error("Error loading reCAPTCHA script:", error);
  });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
