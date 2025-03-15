import { NavigationProp, RouteProp } from '@react-navigation/native';

import { MainRoute } from './constants';
import {
  AppUserWalletsDto,
  UserData,
} from '@app/features/wallet/redux/types.ts';
import { ModifiedWallet } from '@app/features/wallet/components/WalletsList/WalletsList.tsx';

export type MainParamList = {
  [MainRoute.Wallet]: undefined;
  [MainRoute.WalletDetails]: { item: ModifiedWallet };
  [MainRoute.Deposit]: undefined;
  [MainRoute.DepositDetails]: { item?: AppUserWalletsDto };
  [MainRoute.Withdraw]: undefined;
  [MainRoute.WithdrawDetails]: { item: ModifiedWallet };
  [MainRoute.History]: undefined;
  [MainRoute.TransferUser]: undefined;
  [MainRoute.TransferAsset]: { user: UserData };
  [MainRoute.TransferDetails]: { user: UserData; item: ModifiedWallet };
};

export type MainNavigationProp<
  RouteName extends keyof MainParamList = MainRoute.Wallet,
> = NavigationProp<MainParamList, RouteName>;

export type MainNavigationRoutProp<T extends keyof MainParamList> = RouteProp<
  MainParamList,
  T
>;
