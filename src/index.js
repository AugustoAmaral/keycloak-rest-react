import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import InitKeycloak from "./InitKeycloak";
import "antd/dist/antd.css";

ReactDOM.render(
  <InitKeycloak>
    <App />
  </InitKeycloak>,
  document.getElementById("root")
);
