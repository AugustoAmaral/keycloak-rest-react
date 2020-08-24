import React, { useState, useEffect } from "react";
import keycloak from "./keycloak/keycloak";
import {
  storeKeycloakInfo,
  loadKeycloakInfo,
  cleanKeycloakInfo,
} from "./keycloak/functions";

const InitKeycloak = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    //Check if user exists
    if (loadKeycloakInfo()) {
      //chgeck if existent user is valid
      keycloak
        .getUserInfo(loadKeycloakInfo().access_token)
        .then(() => keycloak.refreshToken(loadKeycloakInfo().refresh_token))
        .then(() => setAuthenticated(true))
        .catch((err) => {
          //if is not, delete local user and call init to redirect to keycloak login
          cleanKeycloakInfo();
          keycloak.init();
        });
    } else {
      keycloak.init().then((response) => {
        storeKeycloakInfo(response);
        setAuthenticated(true);
      });
    }
  }, []);
  return authenticated ? children : <div>Authenticating</div>;
};

export default InitKeycloak;
