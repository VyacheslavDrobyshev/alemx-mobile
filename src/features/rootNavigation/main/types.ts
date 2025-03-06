import { NavigationProp, RouteProp } from '@react-navigation/native';

import { MainRoute } from './constants';

export type MainParamList = {
  [MainRoute.Wallet]: undefined;
};

export type MainNavigationProp<
  RouteName extends keyof MainParamList = MainRoute.Wallet,
> = NavigationProp<MainParamList, RouteName>;

export type MainNavigationRoutProp<T extends keyof MainParamList> = RouteProp<
  MainParamList,
  T
>;
