import axios from 'axios';

//Auto Login TOKEN Intercepters

const TOKEN = localStorage.getItem('access_token');
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer` + TOKEN,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { statue },
    } = error;

    const originalRequest = config;

    if (error.response.status === 403) {
      const accessToken = sessionStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      try {
        const { data } = await axios({
          method: 'post',
          url: `v1/login`,
          data: { accessToken, refreshToken },
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer` + newAccessToken,
        };
        sessionStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        return await axios(originalRequest);
      } catch (err) {
        new Error(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
