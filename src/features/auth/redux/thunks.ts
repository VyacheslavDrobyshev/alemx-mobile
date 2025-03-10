import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '@app/features/auth/api';
import {
  AppLoginDto,
  AppLoginError,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/features/auth/redux/types.ts';
import { AxiosError } from 'axios';
import { ejectAuthInterceptor } from '@app/api/interceptor.ts';

export const loginThunk = createAsyncThunk<
  AppLoginDto,
  AppLoginParams,
  { rejectValue: string }
>('auth/loginThunk', async (params, { rejectWithValue }) => {
  try {
    return await loginApi(params);
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const registerThunk = createAsyncThunk<
  AppRegisterDto,
  AppRegisterParams,
  { rejectValue: string }
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

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  ejectAuthInterceptor();
});
