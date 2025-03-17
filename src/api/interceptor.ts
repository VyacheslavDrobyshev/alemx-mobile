import axios from 'axios';
import { store } from '@app/redux/store';
import { logoutThunk } from '@app/features/auth/redux/thunks';

export const instance = axios.create({
  baseURL: 'https://api.alemx.dev-page.site',
});

let reqInt: null | number = null;

reqInt = instance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth?.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response?.data.message === 'refresh token is expired') {
      void store.dispatch(logoutThunk());
      return;
    }
    return Promise.reject(error);
  },
);

export default instance;

export const ejectAuthInterceptor = () => {
  if (reqInt !== null) {
    axios.interceptors.request.eject(reqInt);
    reqInt = null;
  }
};
