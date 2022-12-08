import axios from 'axios';

// create BASE API
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

// API TOKEN Intercepters
api.interceptors.request.use((config) => {
  const access_token = sessionStorage.getItem('access_token');
  const refresh_token = sessionStorage.getItem('refresh_token');

  if (refresh_token || access_token) {
    config.headers['access-token'] = `Bearer ${access_token}`;
    config.headers['refresh-token'] = `${refresh_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 423) {
      const originalRequestConfig = error.config;
      try {
        const data = await api.post('v1/login', '');
        sessionStorage.setItem('access_token', data.headers.access_token);
        sessionStorage.setItem('refresh_token', data.headers.refresh_token);
        originalRequestConfig.headers['access-token'] = `Bearer ${sessionStorage.getItem('access_token')}`;
        originalRequestConfig.headers['refresh-token'] = `${sessionStorage.getItem('refresh_token')}`;
        document.cookie = `access_token=${data.headers.access_token}`;
        document.cookie = `refresh_token=${data.headers.refresh_token}`;
        return await axios(originalRequestConfig);
      } catch (err) {
        console.log(err);
        new Error(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
