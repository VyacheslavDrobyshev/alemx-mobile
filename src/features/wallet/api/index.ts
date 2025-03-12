import { default as axios } from '@app/api/interceptor.ts';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  AppFeeDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  AppWithdrawParams,
  PaginationParams,
} from '@app/features/wallet/redux/types.ts';

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

export const getAssetsApi = async (params: PaginationParams) => {
  const response = await axios.get<AppAssetsDto>('/assets', { params });
  return response.data;
};
