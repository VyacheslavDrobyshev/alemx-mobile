import { AppLoginError } from '@app/features/auth/redux/types.ts';
import { AxiosError } from 'axios';
import {
  createUserWalletApi,
  getAssetsApi,
  getUserUnifiedBalanceApi,
  getUserWalletsApi,
} from '@app/features/wallet/api';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  PaginationParams,
} from '@app/features/wallet/redux/types.ts';

import { createAppThunk } from '@app/redux/thunk.ts';

export const getUserWalletsThunk = createAppThunk<AppUserWalletsDto[], void>(
  'auth/getUserWalletsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserWalletsApi();
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const createUserWalletsThunk = createAppThunk<
  AppUserWalletsDto[],
  AppCreateWalletParams
>(
  'auth/createUserWalletsThunk',
  async ({ assetsIds }, { rejectWithValue, dispatch }) => {
    try {
      await createUserWalletApi({ assetsIds });
      const { payload } = await dispatch(getUserWalletsThunk());
      return payload;
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const getAssetsThunk = createAppThunk<AppAssetsDto, PaginationParams>(
  'auth/getAssetsThunk',
  async (params, { rejectWithValue }) => {
    try {
      return await getAssetsApi(params);
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const getUnifiedBalanceThunk = createAppThunk<
  AppUserUnifiedBalanceDto,
  void
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
