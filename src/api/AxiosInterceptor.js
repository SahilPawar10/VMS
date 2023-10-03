import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create({
  // baseURL: 'http://4.213.4.211/v1/', // base URL in use
  // baseURL: "http://192.168.1.145:3000/v1", //  server
  baseURL: "http://localhost:3002/v1", // local server
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token"); // access token
    const refresh_token = localStorage.getItem("refresh_token"); // refresh token

    if (access_token) {
      const { exp } = jwt_decode(access_token);
      console.log(exp);

      if (Date.now() >= exp * 1000) {
        localStorage.clear();
        if (refresh_token) {
          window.location.href = "/";
          localStorage.clear();
          // try {
          //   const response = await axios.post(
          //     'http://20.219.2.91:86/v1/auth/refresh-tokens', // refresh token URL
          //     { refreshToken: refresh_token }
          //   );
          //   console.log(response.data.access);
          //   localStorage.setItem('access_token', response.data.access);
          //   localStorage.setItem('refresh_token', response.data.refresh);
          //   config.headers['Authorization'] = `Bearer ${response.data.access}`;
          // } catch (err) {
          //   console.log(err);
          // }
        }
      } else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Handle any errors from the response
    if (error.response && error.response.status === 401) {
      // Redirect to login page if user is not authorized)
      // window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
