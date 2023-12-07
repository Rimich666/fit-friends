import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {REQUEST_TIMEOUT} from '../settings';
import {getToken} from './token';
import {getBaseUrl} from '../helpers/get-base-url';
import {toast} from 'react-toastify';
import {getErrorToastMessage} from './error-toast-message';
import {browserHistory} from '../browser-history';

import {AppRoute} from '../app-route';
import {ApiRoute} from '../api-route';
import {getRefresh, memoizedRefreshToken,} from './refresh-token';

type ErrorData = {
  statusCode: string;
  statusText: string;
  message: string[];
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use((response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const config = error.config;
      const errorData: ErrorData = error.response?.data as ErrorData;
      const message = errorData.message ?
        getErrorToastMessage([errorData.statusCode, errorData.statusText].concat(errorData.message)) :
        `${error.code as string} ${error.message}` ;
      toast.error(message);
      if (parseInt(errorData.statusCode, 10) === 400) {
        error.message = JSON.stringify(errorData.message);
        error.code = errorData.statusText;
      }
      if (error.response?.config.url === ApiRoute.Login && parseInt(errorData.statusCode, 10) === 409)
      {
        browserHistory.push(AppRoute.Main);
      }
      if (error?.response?.status === 401) {
        const accessToken = await memoizedRefreshToken(getRefresh());
        if (accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${accessToken}`,
          };
        }

        return axios(config);
      }

      return Promise.reject(error);
    });

  return api;
};
