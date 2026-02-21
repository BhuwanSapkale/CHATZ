import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://chatz-i9nv.onrender.com',
  withCredentials: true,
});
