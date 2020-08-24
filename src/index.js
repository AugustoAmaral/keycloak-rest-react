import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import InitKeycloak from "./InitKeycloak";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <InitKeycloak>
      <App />
    </InitKeycloak>
  </React.StrictMode>,
  document.getElementById("root")
);
