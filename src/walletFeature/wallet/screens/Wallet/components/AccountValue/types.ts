import { FC } from 'react';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { AppColorValue } from '@app/walletFeature/wallet/common/theme';

export enum AccountValueButtonsId {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  Buy = 'buy',
  Swap = 'swap',
  History = 'history',
}

export type AccountValueButtonsList = {
  Button: FC<{ color: AppColorValue }>;
  title: string;
  route: keyof WalletParamList;
  id: AccountValueButtonsId;
};
