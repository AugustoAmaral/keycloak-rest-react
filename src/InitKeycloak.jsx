import { useEffect } from "react";
import keycloak from "./keycloak/keycloak";
import {
  storeKeycloakInfo,
  loadKeycloakInfo,
  cleanKeycloakInfo,
} from "./keycloak/functions";

const InitKeycloak = () => {
  useEffect(() => {
    //Check if user exists
    if (loadKeycloakInfo()) {
      //chgeck if existent user is valid
      keycloak
        .getUserInfo(loadKeycloakInfo().access_token)
        .then(() => keycloak.refreshToken(loadKeycloakInfo().refresh_token))
        .catch((err) => {
          //if is not, delete local user and call init to redirect to keycloak login
          cleanKeycloakInfo();
          keycloak.init();
        });
    } else {
      keycloak.init().then((response) => storeKeycloakInfo(response));
    }
  }, []);
  return null;
};

export default InitKeycloak;
