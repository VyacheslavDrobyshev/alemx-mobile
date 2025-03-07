import { CoreReduxState } from '@app/redux/types';

export const selectUserWallets = ({ wallets }: CoreReduxState) =>
  wallets.wallets;
