import { UnauthorizedRoute } from './constants.ts';

export type UnauthorizedParamList = {
  [UnauthorizedRoute.SignIn]: undefined;
  [UnauthorizedRoute.SignUp]: undefined;
};
