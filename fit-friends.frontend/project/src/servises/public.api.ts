import axios from 'axios';
import {getBaseUrl} from '../helpers/get-base-url';

export const publicApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
