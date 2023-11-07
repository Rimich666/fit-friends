import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiRoute, AppRoute, REQUEST_TIMEOUT} from '../settings';
import {getToken} from './token';
import {getBaseUrl} from '../utils/get-base-url';
import {toast} from 'react-toastify';
import {getErrorToastMessage} from './error-toast-message';
import {browserHistory} from '../browser-history';

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
    (error: AxiosError) => {
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
      if (parseInt(errorData.statusCode, 10) === 401) {
        browserHistory.push(AppRoute.Login);
      }
      return Promise.reject(error);
    });

  return api;
};
