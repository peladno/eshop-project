import axios from "axios";

const tokenKey = localStorage.getItem("token");

export const user = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
    withCredentials: true,
  },
});

export const clientAdmin = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "Content-type": "application/json",
  },
});

export const client = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    withCredentials: true,
  },
});
