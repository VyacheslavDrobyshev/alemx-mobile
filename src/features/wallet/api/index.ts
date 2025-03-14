import { TransactionType } from '@app/features/wallet/screens/Wallet/constants.ts';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  AppFeeDto,
  AppTransferParams,
  AppUsersDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  AppWithdrawParams,
  PaginationParams,
  TransferTransactionDto,
} from '@app/features/wallet/redux/types.ts';
import { default as axios } from '@app/api/interceptor.ts';

export const getUserWalletsApi = async () => {
  const response = await axios.get<AppUserWalletsDto[]>('user/wallets');
  return response.data;
};

export const createUserWalletApi = async ({
  assetsIds,
}: AppCreateWalletParams) => {
  const response = await axios.post('/user/wallets', { assetsIds });
  return response.data;
};

export const getUserUnifiedBalanceApi = async () => {
  const response = await axios.get<AppUserUnifiedBalanceDto>(
    'user/unified-balance',
  );
  return response.data;
};

export const getTransactionFeeApi = async (params: AppWithdrawParams) => {
  const response = await axios.post<AppFeeDto>(
    'transaction/withdrawal/estimate-fee',
    params,
  );
  return response.data;
};

export const getValidateAmountApi = async (params: AppWithdrawParams) => {
  const response = await axios.post(
    'transaction/withdrawal/validate-amount',
    params,
  );
  return response.data;
};

export const createWithdrawApi = async (params: AppWithdrawParams) => {
  const response = await axios.post<void>('user/make-withdraw', params);
  return response.data;
};

export const createTransferApi = async (params: AppTransferParams) => {
  const response = await axios.post<void>('user/make-transfer', params);
  return response.data;
};

export const getAssetsApi = async (params: PaginationParams) => {
  const response = await axios.get<AppAssetsDto>('/assets', { params });
  return response.data;
};

export const getUsersApi = async (params: PaginationParams) => {
  const response = await axios.get<AppUsersDto>('/users/all', { params });
  return response.data;
};

export const getTransactionsApi = async (
  params: PaginationParams & { transaction_type: TransactionType },
) => {
  const response = await axios.get<TransferTransactionDto>(
    '/user/transactions',
    {
      params,
    },
  );
  return response.data;
};
