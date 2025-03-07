import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '@app/features/auth/api';
import storage from 'react-native-encrypted-storage';
import {
  AppLoginDto,
  AppLoginError,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/features/auth/redux/types.ts';
import { AxiosError } from 'axios';

export const loginThunk = createAsyncThunk<
  AppLoginDto,
  AppLoginParams,
  { rejectValue: string }
>('auth/loginThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await loginApi(params);
    await storage.setItem('accessToken', response.accessToken ?? '');
    return response;
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
    const response = await registerApi(params);
    await storage.setItem('accessToken', response.accessToken ?? '');
    console.log(response);
    return response;
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const logoutThunk = createAsyncThunk(
  'auth/logoutThunk',
  async (_, { rejectWithValue }) => {
    try {
      await storage.removeItem('accessToken');
    } catch (e) {
      return rejectWithValue(String(e));
    }
  },
);
