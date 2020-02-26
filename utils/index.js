import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "./helpers";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req
    ? getCookieFromReq(req, "jwt")
    : Cookies.getJSON("jwt");
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    return undefined;
  }
};

const rejectPromise = resError => {
  let errors = {};
  if (resError && resError.response && resError.response.data) {
    errors = resError.response.data;
  } else {
    errors = resError;
  }
  return Promise.reject(errors);
};
export const getPortfolioById = async id => {
  return await axiosInstance
    .get(`/portfolios/${id}`)
    .then(res => res.data);
};

// export const getSecureData = async req => {
//   const url = "http://localhost:3000/api/v1/secret";
//   return await axios
//     .get(url, { headers: setAuthHeader(req) })
//     .then(res => res.data);
// };

export const getPortfolios = async () => {
  return await axiosInstance.get("/portfolios").then(res => res.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post("/portfolios", portfolioData, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const updatePortfolio = async portfolioData => {
  return await axiosInstance
    .patch(
      `/portfolios/${portfolioData._id}`,
      portfolioData,
      setAuthHeader()
    )
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};
export const deletePortfolio = async PortfolioId => {
  return await axiosInstance
    .delete(`/portfolios/${PortfolioId}`, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};
