import axios from "axios";
import { getStrapiUrl } from "./strapiUtils";

export function getAuthHeader(jwt) {
  let _jwt = jwt;
  if (!_jwt) {
    _jwt = localStorage.getItem("jwt");
  }
  if (!_jwt) return null;
  return {
    headers: {
      Authorization: `Bearer ${_jwt}`,
    },
  };
}

export async function validateJwt(jwt) {
  const authHeader = getAuthHeader(jwt);
  if (!authHeader) return false;
  try {
    const res = await axios.get(getStrapiUrl("/users/me"), authHeader);
    if (res.status !== 200) {
      if (jwt) localStorage.setItem("jwt", null);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
