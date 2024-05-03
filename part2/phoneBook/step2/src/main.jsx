import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const persons = [{ name: "Arto Hellas" }];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App persons={persons} />
  </React.StrictMode>
);
