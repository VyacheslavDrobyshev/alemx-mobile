import { WalletRoute } from './constants.ts';
import {
  AppUserWalletsDto,
  UserData,
} from '@app/features/wallet/redux/types.ts';
import { ModifiedWallet } from '@app/features/wallet/components/WalletsList/WalletsList.tsx';
import { ReactElement } from 'react';

export type WalletParamList = {
  [WalletRoute.Wallet]: undefined;
  [WalletRoute.WalletDetails]: { item: ModifiedWallet };
  [WalletRoute.Deposit]: undefined;
  [WalletRoute.DepositDetails]: { item?: AppUserWalletsDto };
  [WalletRoute.Withdraw]: undefined;
  [WalletRoute.WithdrawDetails]: { item: ModifiedWallet };
  [WalletRoute.History]: undefined;
  [WalletRoute.TransactionDetails]: {
    header: ReactElement;
    title: string;
    rows: { [key: string]: string };
  };
  [WalletRoute.TransferUser]: undefined;
  [WalletRoute.TransferAsset]: { user: UserData };
  [WalletRoute.TransferDetails]: { user: UserData; item: ModifiedWallet };
};
