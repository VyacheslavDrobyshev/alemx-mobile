import { loginApi, registerApi } from '@app/walletFeature/auth/api';
import {
  AppLoginDto,
  AppLoginError,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/walletFeature/auth/redux/types';
import { AxiosError } from 'axios';
import { ejectAuthInterceptor } from '@app/walletFeature/wallet/common/api/interceptor';
import { createAppThunk } from '@app/walletFeature/wallet/common/redux/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
