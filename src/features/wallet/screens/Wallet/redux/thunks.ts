import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppLoginError } from '@app/features/auth/redux/types.ts';
import { AxiosError } from 'axios';
import {
  getAssetsApi,
  getUserUnifiedBalanceApi,
  getUserWalletsApi,
} from '@app/features/wallet/screens/Wallet/api';
import {
  AppAssetsDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
} from '@app/features/wallet/screens/Wallet/redux/types.ts';

export const getUserWalletsThunk = createAsyncThunk<
  AppUserWalletsDto[],
  void,
  { rejectValue: string }
>('auth/getUserWalletsThunk', async (params, { rejectWithValue }) => {
  try {
    return await getUserWalletsApi();
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const getAssetsThunk = createAsyncThunk<
  AppAssetsDto[],
  void,
  { rejectValue: string }
>('auth/getAssetsThunk', async (_, { rejectWithValue }) => {
  try {
    return await getAssetsApi();
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const getUnifiedBalanceThunk = createAsyncThunk<
  AppUserUnifiedBalanceDto,
  void,
  { rejectValue: string }
>('auth/getUnifiedBalanceThunk', async (_, { rejectWithValue }) => {
  try {
    return await getUserUnifiedBalanceApi();
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});
