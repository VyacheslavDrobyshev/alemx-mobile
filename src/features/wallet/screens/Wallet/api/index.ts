import { default as axios } from '@app/api/interceptor';
import {
  AppAssetsDto,
  AppUserUnifiedBalanceDto,
  AppUserWalletsDto,
} from '@app/features/wallet/screens/Wallet/redux/types.ts';

export const getUserWalletsApi = async () => {
  const response = await axios.get<AppUserWalletsDto[]>('user/wallets');
  return response.data;
};

export const getUserUnifiedBalanceApi = async () => {
  const response = await axios.get<AppUserUnifiedBalanceDto>(
    'user/unified-balance',
  );
  return response.data;
};

export const getAssetsApi = async () => {
  const response = await axios.get<AppAssetsDto[]>('/assets');
  return response.data;
};
