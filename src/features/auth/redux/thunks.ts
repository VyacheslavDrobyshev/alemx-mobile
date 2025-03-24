import { getUserinfoApi, loginApi, registerApi } from '@app/features/auth/api';
import {
  AppLoginDto,
  AppLoginError,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
  UserInfoDto,
} from '@app/features/auth/redux/types';
import { AxiosError } from 'axios';
import { ejectAuthInterceptor } from '@app/api/interceptor';
import { createAppThunk } from '@app/redux/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserInfoThunk = createAsyncThunk<UserInfoDto>(
  'auth/getUserInfoThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserinfoApi();
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const loginThunk = createAsyncThunk<AppLoginDto, AppLoginParams>(
  'auth/loginThunk',
  async (params, { rejectWithValue }) => {
    try {
      return await loginApi(params);
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const registerThunk = createAsyncThunk<
  AppRegisterDto,
  AppRegisterParams
>('auth/registerThunk', async (params, { rejectWithValue }) => {
  try {
    return await registerApi(params);
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const logoutThunk = createAppThunk('auth/logoutThunk', () => {
  ejectAuthInterceptor();
});
