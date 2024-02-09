import React from "react";
import ReactDOM from "react-dom/client";
import "@app/index.css";
import { App } from "@app/app";
import { getRender } from "@shared/sam";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const render = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

getRender(render);

render();
