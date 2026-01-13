/**
 * @file Application entry point.
 * Initializes React, Redux store, and renders the root App component.
 * This is the main entry point for the entire application.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/App.jsx";
import "@/index.css";

/**
 * Renders the React application into the DOM.
 * Wraps the App component with React.StrictMode for development checks
 * and Redux Provider for global state management.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
