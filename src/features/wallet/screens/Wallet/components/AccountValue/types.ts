import { JSX } from 'react';
import { WalletParamList } from '@app/features/rootNavigation/main/types.ts';

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
