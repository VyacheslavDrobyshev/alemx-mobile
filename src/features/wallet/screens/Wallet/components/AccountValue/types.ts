import { JSX } from 'react';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';

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
  route: keyof MainParamList;
  id: AccountValueButtonsId;
};
