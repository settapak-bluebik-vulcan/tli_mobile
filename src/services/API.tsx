/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useAuthStore } from '@stores';
import axios, { AxiosError } from 'axios';

export const API = axios.create({
  headers: {
    'Accept-Language': 'TH',
  },
});

export const initAPI = (apiUrl?: string) => {
  const Config = {
    API_URL: apiUrl,
  };

  API.defaults.baseURL = Config.API_URL;
  API.interceptors.request.use(
    config => {
      const authStore = useAuthStore.getState();
      const { accessToken } = authStore;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  API.interceptors.response.use(
    response => {
      // if success return response
      if (response.status === 200) return response;

      throw new AxiosError(
        response.statusText,
        `${response.status}`,
        response.config,
        response.request,
        response
      );
    },
    async error => {
      const authStore = useAuthStore.getState();

      const { refreshToken } = authStore;
      const originalRequest = error.config;

      if (error.message === 'Network Error') {
        throw new AxiosError(
          error.message,
          error.message,
          error.config,
          error.request,
          error
        );
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const httpClient = axios.create({
            baseURL: Config.API_URL,
            headers: {
              'Accept-Language': 'TH',
            },
          });

          // get refresh token
          const response = await httpClient.post(`${Config.API_URL}`, {
            refreshToken,
          });

          if (response.data.data.status === 200) {
            // api success update auth store
            authStore.setTokens({
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
            });

            // update authorization
            originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;

            // re get api
            return await httpClient(originalRequest);
          }
          authStore.removeTokens();

          return await Promise.reject();
        } catch (catchError) {
          authStore.removeTokens();
          return Promise.reject(catchError);
        }
      }

      return Promise.reject(error);
    }
  );
};
