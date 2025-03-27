import { AppUserWalletsDto, UserData } from '@app/walletFeature/wallet/redux/types';
import { ModifiedWallet } from '@app/walletFeature/wallet/components/WalletsList/WalletsList';
import { ReactElement } from 'react';
import { WalletAssetWithBalance } from '@app/walletFeature/wallet/components/BalancesList/BalancesList';

import { WalletRoute } from './constants';

export type WalletParamList = {
  [WalletRoute.Wallet]: undefined;
  [WalletRoute.WalletDetails]: { item: WalletAssetWithBalance };
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
  [WalletRoute.TransferUser]: { item: WalletAssetWithBalance } | undefined;
  [WalletRoute.TransferAsset]: { user: UserData };
  [WalletRoute.TransferDetails]: {
    user: UserData;
    item: WalletAssetWithBalance;
  };
  [WalletRoute.NetworkLogger]: undefined;
  [WalletRoute.Swap]: undefined;
  [WalletRoute.SwapAssets]: undefined;
};
