import React from "react"; // Import the React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App"; // Import the main App component
import "./index.css"; // Import the global CSS file

// Create the root element for the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/* Enforces additional checks and warnings in development mode */}
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
