import { TransactionType } from '@app/walletFeature/wallet/screens/Wallet/constants';
import {
  AppAssetsDto,
  AppCreateWalletParams,
  NetworkFeeDto,
  AppTransferParams,
  AppUsersDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
  AppWithdrawParams,
  PaginationParams,
  PlatformFeeDto,
  PlatformFeeParams,
  TransactionPaginationParams,
  TransferTransactionDto,
  UnifiedBalanceByNetworkDto,
  UserInfoDto,
} from '@app/walletFeature/wallet/redux/types';
import { instance } from '@app/walletFeature/wallet/common/api/interceptor';

export const getUserWalletsApi = async () => {
  const response = await instance.get<AppUserWalletsDto[]>('user/wallets');
  return response.data;
};

export const getDepositWalletsApi = async () => {
  const response = await instance.get<AppUserWalletsDto[]>(
    'user/deposit-wallets',
  );
  return response.data;
};

export const createUserWalletApi = async ({
  assetsIds,
}: AppCreateWalletParams) => {
  const response = await instance.post<AppCreateWalletParams>('/user/wallets', {
    assetsIds,
  });
  return response.data;
};

export const getUserUnifiedBalanceApi = async () => {
  const response = await instance.get<AppUserUnifiedBalanceDto>(
    'user/unified-balance',
  );
  return response.data;
};

export const getTransactionFeeApi = async (params: AppWithdrawParams) => {
  const response = await instance.post<NetworkFeeDto>(
    'transaction/withdrawal/estimate-fee',
    params,
  );
  return response.data;
};

export const createWithdrawApi = async (params: AppWithdrawParams) => {
  const response = await instance.post<void>('user/make-withdraw', params);
  return response.data;
};

export const createTransferApi = async (params: AppTransferParams) => {
  const response = await instance.post<void>('user/make-transfer', params);
  return response.data;
};

export const getAssetsApi = async (params: PaginationParams) => {
  const response = await instance.get<AppAssetsDto>('/assets', { params });
  return response.data;
};

export const getUsersApi = async (params: PaginationParams) => {
  const response = await instance.get<AppUsersDto>('/users/all', { params });
  return response.data;
};

export const getTransactionsApi = async (
  params: TransactionPaginationParams & { transaction_type: TransactionType },
) => {
  const response = await instance.get<TransferTransactionDto>(
    '/user/transactions',
    {
      params,
    },
  );
  return response.data;
};

export const getUserinfoApi = async (): Promise<UserInfoDto> => {
  const response = await instance.get<UserInfoDto>('auth/me');
  return response.data;
};

export const getPlatformFeeApi = async (params: PlatformFeeParams) => {
  const response = await instance.post<PlatformFeeDto>(
    'transaction/platform-fee',
    undefined,
    { params },
  );
  return response.data;
};

export const getUnifiedBalanceByNetworkApi = async () => {
  const response = await instance.get<UnifiedBalanceByNetworkDto[]>(
    'balance/unified-asset-balance-by-networks',
  );
  return response.data;
};
