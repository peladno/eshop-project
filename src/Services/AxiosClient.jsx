import axios from "axios";

const tokenKey = localStorage.getItem("token");

export const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
    withCredentials: true,
  },
});

export const clientAdmin = axios.create({
  baseURL: process.env.REACT_APP_SERVER + "api",
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
  },
});

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER + "api",
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
  },
});
