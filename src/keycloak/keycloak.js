import { apiAddress, getUriParams, objectToForm } from "./functions";
import oidConfig from "./oidConfig.json";

const { scope, response_type, client_id, client_secret } = oidConfig;
const url = "http://localhost:8080/auth/realms/test/protocol/openid-connect";
const redirect_uri = window.location.origin + window.location.pathname;

const authenticate = () =>
  window.location.replace(
    apiAddress(url + "/auth", { scope, response_type, client_id, redirect_uri })
  );

const logout = (refresh_token) =>
  fetch(apiAddress(url + "/logout", { redirect_uri }), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: objectToForm({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token,
    }),
    mode: "cors",
  });

const getToken = (code) =>
  fetch(apiAddress(url + "/token"), {
    method: "POST",
    headers: {
      Authorization: `Basic ${window.btoa(`${client_id}:${client_secret}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: objectToForm({
      code,
      grant_type: "authorization_code",
      redirect_uri,
    }),
    mode: "cors",
  })
    .then((res) => res.json())
    .then((response) => response);

const refreshToken = (refresh_token) =>
  fetch(apiAddress(url + "/token"), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: objectToForm({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token,
      scope,
    }),
    mode: "cors",
  })
    .then((res) => res.json())
    .then((response) => response);

const getUserInfo = (token) =>
  fetch(apiAddress(url + "/userinfo"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((response) => response);

const keycloakAuthenticate = () => {
  var code = null;
  if (window.location.search.substring(1)) {
    code = getUriParams().code;
    window.history.pushState(
      {},
      "test",
      window.location.origin + window.location.pathname
    );
    return getToken(code).then((res) =>
      getUserInfo(res.access_token).then((response) => ({
        ...res,
        ...response,
      }))
    );
  } else {
    authenticate();
    return new Promise((resolve, reject) => reject());
  }
};

export default {
  logout,
  refreshToken,
  getUserInfo,
  init: keycloakAuthenticate,
};
