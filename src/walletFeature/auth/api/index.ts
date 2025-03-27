import { instance } from '@app/walletFeature/wallet/common/api/interceptor';
import {
  AppLoginDto,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/walletFeature/auth/redux/types';

export const loginApi = async (params: AppLoginParams) => {
  const response = await instance.post<AppLoginDto>('auth/login/', params);
  return response.data;
};

export const registerApi = async (params: AppRegisterParams) => {
  const response = await instance.post<AppRegisterDto>(
    'auth/register-user/',
    params,
  );
  return response.data;
};
