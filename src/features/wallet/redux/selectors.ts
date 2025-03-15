import { CoreReduxState } from '@app/redux/types.ts';

export const selectUserWallets = ({ wallets }: CoreReduxState) =>
  wallets.wallets;

export const selectDepositWallets = ({ wallets }: CoreReduxState) =>
  wallets.depositWallets;

export const selectUnifiedBalance = ({ wallets }: CoreReduxState) =>
  wallets.unifiedBalance;

export const selectAssets = ({ wallets }: CoreReduxState) => wallets.assets;
export const selectUsers = ({ wallets }: CoreReduxState) => wallets.users;

export const selectWalletSettings = ({ wallets }: CoreReduxState) =>
  wallets.walletSettings;

export const selectNextAssetCursor = ({ wallets }: CoreReduxState) =>
  wallets.assets.next_cursor;

export const selectNextUserCursor = ({ wallets }: CoreReduxState) =>
  wallets.users.next_cursor;

export const selectTransactionsByType = ({ wallets }: CoreReduxState) =>
  wallets.transactionsByType;
