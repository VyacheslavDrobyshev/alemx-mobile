import { NavigationProp, RouteProp } from '@react-navigation/native';

import { MainRoute } from './constants';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';

export type MainParamList = {
  [MainRoute.Wallet]: undefined;
  [MainRoute.Deposit]: undefined;
  [MainRoute.DepositDetails]: { item?: AssetsData; network: string };
  [MainRoute.Withdraw]: undefined;
  [MainRoute.WithdrawDetails]: undefined;
  [MainRoute.History]: undefined;
};

export type MainNavigationProp<
  RouteName extends keyof MainParamList = MainRoute.Wallet,
> = NavigationProp<MainParamList, RouteName>;

export type MainNavigationRoutProp<T extends keyof MainParamList> = RouteProp<
  MainParamList,
  T
>;
