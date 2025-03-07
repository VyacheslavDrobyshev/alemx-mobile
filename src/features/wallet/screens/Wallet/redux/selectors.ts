import { CoreReduxState } from '@app/redux/types';

export const selectUserWallets = ({ wallets }: CoreReduxState) =>
  wallets.wallets;

export const selectUnifiedBalance = ({ wallets }: CoreReduxState) =>
  wallets.unifiedBalance;

export const selectAssets = ({ wallets }: CoreReduxState) => wallets.assets;

export const selectWalletSettings = ({ wallets }: CoreReduxState) =>
  wallets.walletSettings;
