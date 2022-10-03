import axios from "axios";

const tokenKey = localStorage.getItem("token");

export const user = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
  },
});

export const clientAdmin = axios.create({
  baseURL: process.env.REACT_APP_URL + "api",
  headers: {
    admin: true,
    "Content-type": "application/json",
  },
});

export const client = axios.create({
  baseURL: process.env.REACT_APP_URL + "api",
  headers: {
    "Content-type": "application/json",
  },
});
