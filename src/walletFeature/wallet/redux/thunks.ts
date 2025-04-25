import { AxiosError } from 'axios';
import { createAppThunk } from '@app/walletFeature/wallet/common/redux/thunk';
import { TransactionType } from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  AppUsersDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  PaginationParams,
  TransactionPaginationParams,
  TransferTransactionDto,
  UnifiedBalanceByNetworkDto,
  UserInfoDto,
  AppLoginError,
} from '@app/walletFeature/wallet/redux/types';
import {
  createUserWalletApi,
  getAssetsApi,
  getDepositWalletsApi,
  getTransactionsApi,
  getUnifiedBalanceByNetworkApi,
  getUserinfoApi,
  getUsersApi,
  getUserUnifiedBalanceApi,
  getUserWalletsApi,
} from '@app/walletFeature/wallet/api';
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

export const getDepositWalletsThunk = createAppThunk<AppUserWalletsDto[], void>(
  'auth/getDepositWalletsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await getDepositWalletsApi();
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
      return payload as AppUserWalletsDto[];
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const getAssetsThunk = createAsyncThunk<AppAssetsDto, PaginationParams>(
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

export const getUsersThunk = createAsyncThunk<AppUsersDto, PaginationParams>(
  'auth/getUsersThunk',
  async (params, { rejectWithValue }) => {
    try {
      return await getUsersApi(params);
    } catch (e) {
      const error = e as AxiosError<AppLoginError>;
      return rejectWithValue(
        error.response?.data.detail ?? 'Something went wrong',
      );
    }
  },
);

export const getTransactionsThunk = createAsyncThunk<
  TransferTransactionDto,
  TransactionPaginationParams & { transaction_type: TransactionType }
>('auth/getTransactionsThunk', async (params, { rejectWithValue }) => {
  try {
    return await getTransactionsApi(params);
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});

export const getUnifiedBalanceThunk = createAsyncThunk<
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

export const getUnifiedBalanceByNetworkThunk = createAsyncThunk<
  UnifiedBalanceByNetworkDto[],
  void
>('auth/getUnifiedBalanceByNetworkThunk', async (_, { rejectWithValue }) => {
  try {
    return await getUnifiedBalanceByNetworkApi();
  } catch (e) {
    const error = e as AxiosError<AppLoginError>;
    return rejectWithValue(
      error.response?.data.detail ?? 'Something went wrong',
    );
  }
});
