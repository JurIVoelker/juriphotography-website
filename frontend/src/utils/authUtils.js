import axios from "axios";
import { getApiUrl } from "./strapiUtils";
import { deleteCookie } from "./cookieUtils";

export function getAuthHeader(jwt) {
  let _jwt = jwt;

  // If no JWT is passed, look for it in cookies
  if (!_jwt) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    // Find the cookie with the name "jwt"
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (jwtCookie) {
      _jwt = jwtCookie.split("=")[1]; // Extract the token value
    }
  }

  // If no JWT is found, return null
  if (!_jwt) return null;

  // Return the authorization header
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
    const res = await axios.get(getApiUrl("/users/me"), authHeader);
    if (res.status !== 200) {
      if (jwt) deleteCookie("jwt");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
