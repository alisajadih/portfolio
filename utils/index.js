import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "./helpers";

const setAuthHeader = req => {
  const token = req
    ? getCookieFromReq(req, "jwt")
    : Cookies.getJSON("jwt");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return undefined;
  }
};

export const getSecureData = async req => {
  const url = "http://localhost:3000/api/v1/secret";
  return await axios
    .get(url, { headers: setAuthHeader(req) })
    .then(res => res.data);
};
