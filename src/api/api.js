import axios from 'axios';

// create BASE API
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

// API TOKEN Intercepters
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers['access-token'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
