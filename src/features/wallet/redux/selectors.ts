import { CoreReduxState } from '@app/redux/types.ts';

export const selectUserWallets = ({ wallets }: CoreReduxState) =>
  wallets.wallets;

export const selectUnifiedBalance = ({ wallets }: CoreReduxState) =>
  wallets.unifiedBalance;

export const selectAssets = ({ wallets }: CoreReduxState) => wallets.assets;

export const selectWalletSettings = ({ wallets }: CoreReduxState) =>
  wallets.walletSettings;

export const selectNextCursor = ({ wallets }: CoreReduxState) =>
  wallets.assets.nextCursor;
