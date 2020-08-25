import { loadKeycloakInfo } from "../keycloak/functions";

const baseUrl = "http://localhost:8080/auth/admin/realms/sample/";

export default ({ url, method, body }) => {
  const extraParameters = {};
  if (method && body) extraParameters.body = JSON.stringify(body);
  if (method) extraParameters.method = method;
  extraParameters.headers = extraParameters.headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${loadKeycloakInfo().access_token}`,
  };
  return fetch(baseUrl + url, { ...extraParameters })
};
