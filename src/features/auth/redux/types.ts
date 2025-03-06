export type AppAuthState = {
  accessToken: string | null;
  isLoading: boolean;
};

export type AppLoginDto = {
  accessToken: string;
  type: string;
};

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

export type AppRegisterError = AppLoginError;
