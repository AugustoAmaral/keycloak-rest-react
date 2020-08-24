export const apiAddress = (url, query_strings = {}) => {
  let query = new URLSearchParams(query_strings);
  return query.toString() ? url + "?" + query.toString() : url;
};

export const objectToForm = (obj) => {
  let returnString = "";
  Object.keys(obj).forEach((key, index) => {
    if (index === 0) returnString = returnString + `${key}=${obj[key]}`;
    else returnString = returnString + `&${key}=${obj[key]}`;
  });
  return returnString;
};

export const getUriParams = () =>
  JSON.parse(
    '{"' +
      decodeURI(window.location.search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );

export const storeKeycloakInfo = (keycloakInfo) => {
  window.localStorage.setItem("keycloakInfo", JSON.stringify(keycloakInfo));
};

export const loadKeycloakInfo = () =>
  JSON.parse(window.localStorage.getItem("keycloakInfo"));
export const cleanKeycloakInfo = () =>
  window.localStorage.removeItem("keycloakInfo");
