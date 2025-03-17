import { loginApi, registerApi } from '@app/features/auth/api';
import {
  AppLoginDto,
  AppLoginError,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/features/auth/redux/types';
import { AxiosError } from 'axios';
import { ejectAuthInterceptor } from '@app/api/interceptor';
import { createAppThunk } from '@app/redux/thunk';

export const loginThunk = createAppThunk<AppLoginDto, AppLoginParams>(
  'auth/loginThunk',
  async (params, { rejectWithValue }) => {
    try {
      return await loginApi(params);
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(String(e));
    }
  },
);

export const registerThunk = createAppThunk<AppRegisterDto, AppRegisterParams>(
  'auth/registerThunk',
  async (params, { rejectWithValue }) => {
    try {
      return await registerApi(params);
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const logoutThunk = createAppThunk('auth/logoutThunk', () => {
  ejectAuthInterceptor();
});
