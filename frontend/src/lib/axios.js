import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://chatz-i9nv.onrender.com/api'),
  withCredentials: true,
});
