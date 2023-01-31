import axios from 'axios';

const tokenKey = localStorage.getItem('token');
const web = process.env.REACT_APP_SERVER;

export const user = axios.create({
  baseURL: web,
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    'Content-type': 'application/json',
    withCredentials: true,
  },
});

export const clientAdmin = axios.create({
  baseURL: web,
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    'Content-type': 'application/json',
  },
});

export const client = axios.create({
  baseURL: web,
  headers: {
    'Content-type': 'application/json',
    withCredentials: true,
  },
});
