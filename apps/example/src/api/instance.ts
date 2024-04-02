import { axiosInstance } from '@store/libs';
import type { AxiosResponse } from 'axios';
import type { userRefreshToken } from './auth/types';
import { refreshToken } from './auth';

axiosInstance.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

let refreshingFunc: Promise<AxiosResponse<userRefreshToken, any>> | undefined =
  undefined;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!refreshingFunc) refreshingFunc = refreshToken();
      try {
        const { data } = await refreshingFunc;

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${data.access_token}`;

        return await axiosInstance.request(originalRequest);
      } catch (error) {
        window.location.href = '/sign-in';
        localStorage.clear();
      } finally {
        refreshingFunc = undefined;
      }
    }

    if (error.response && !error.response.ok) {
      switch (error.response.status) {
        case 400:
          break;
        case 403:
          if (error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            return axiosInstance.request(originalRequest);
          } else {
          }
          break;
        case 422:
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);
