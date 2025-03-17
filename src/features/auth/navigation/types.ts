import { UnauthorizedRoute } from './constants';

export type UnauthorizedParamList = {
  [UnauthorizedRoute.SignIn]: undefined;
  [UnauthorizedRoute.SignUp]: undefined;
};
