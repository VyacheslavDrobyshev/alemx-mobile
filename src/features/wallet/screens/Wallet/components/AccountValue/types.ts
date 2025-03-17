import { JSX } from 'react';
import { WalletParamList } from '@app/features/wallet/navigation/types';

export enum AccountValueButtonsId {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  Buy = 'buy',
  Swap = 'swap',
  History = 'history',
}

export type AccountValueButtonsList = {
  button: JSX.Element;
  title: string;
  route: keyof WalletParamList;
  id: AccountValueButtonsId;
};
