import { default as axios } from '@app/api/interceptor';
import {
  AppLoginDto,
  AppLoginParams,
  AppRegisterDto,
  AppRegisterParams,
} from '@app/features/auth/redux/types.ts';

export const loginApi = async (params: AppLoginParams) => {
  const response = await axios.post<AppLoginDto>('auth/login/', params);
  return response.data;
};

export const registerApi = async (params: AppRegisterParams) => {
  console.log(params, 'start');
  const response = await axios.post<AppRegisterDto>(
    'auth/register-user/',
    params,
  );
  return response.data;
};
