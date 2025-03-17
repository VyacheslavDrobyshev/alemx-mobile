import { instance } from '@app/api/interceptor';
import {
  AppLoginDto,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/features/auth/redux/types';

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

export const getUserinfoApi = async (): Promise<void> => {
  const response = await instance.get<void>('auth/me');
  return response.data;
};
