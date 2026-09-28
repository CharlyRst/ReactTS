import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DocksProvider } from "./context/DocksContext";
import { RequestsProvider } from "./context/RequestsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DocksProvider>
        <RequestsProvider>
          <App />
        </RequestsProvider>
      </DocksProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
