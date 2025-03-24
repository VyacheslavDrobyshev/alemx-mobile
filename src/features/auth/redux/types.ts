export type AppLoginDto = {
  accessToken: string | null;
  type: string | null;
};

export type AppAuthState = {
  isLoading: boolean;
  userInfo: UserInfoDto | null;
} & AppLoginDto;

export type AppLoginParams = {
  email: string;
  password: string;
};

export type AppLoginError = {
  detail: string;
};

export type AppRegisterDto = AppLoginDto;

export type AppRegisterParams = {
  username: string;
  confirmPassword: string;
} & AppLoginParams;

export type UserInfoDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  vaultAccountId: string;
};

export type AppRegisterError = AppLoginError;
