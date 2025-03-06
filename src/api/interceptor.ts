import axios from 'axios';

import { store } from '@app/redux/store';

import storage from 'react-native-encrypted-storage';
import { logoutThunk } from '@app/features/auth/redux/thunks.ts';
export const instance = axios.create({
  baseURL: 'https://api.alemx.dev-page.site',
});

const reqInt = instance.interceptors.request.use(async config => {
  const accessToken = await storage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const resInt = instance.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    if (error.response?.data.message === 'refresh token is expired') {
      store.dispatch(logoutThunk);
      return;
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.eject(reqInt);
axios.interceptors.response.eject(resInt);

export default instance;
