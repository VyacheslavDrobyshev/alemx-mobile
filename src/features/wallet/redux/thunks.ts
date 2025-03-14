import { AxiosError } from 'axios';
import { createAppThunk } from '@app/redux/thunk.ts';
import { TransactionType } from '@app/features/wallet/screens/Wallet/constants.ts';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  AppUsersDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  PaginationParams,
  TransferTransactionDto,
} from '@app/features/wallet/redux/types.ts';
import {
  createUserWalletApi,
  getAssetsApi,
  getTransactionsApi,
  getUsersApi,
  getUserUnifiedBalanceApi,
  getUserWalletsApi,
} from '@app/features/wallet/api';
import { AppLoginError } from '@app/features/auth/redux/types.ts';

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

export const getUsersThunk = createAppThunk<AppUsersDto, PaginationParams>(
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

export const getTransactionsThunk = createAppThunk<
  TransferTransactionDto,
  PaginationParams & { transaction_type: TransactionType }
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
