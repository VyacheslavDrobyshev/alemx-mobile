import { CoreReduxState } from '@app/walletFeature/wallet/common/redux/types';

export const selectUserWallets = ({ wallets }: CoreReduxState) =>
  wallets.wallets;

export const selectDepositWallets = ({ wallets }: CoreReduxState) =>
  wallets.depositWallets;

export const selectUnifiedBalance = ({ wallets }: CoreReduxState) =>
  wallets.unifiedBalance;

export const selectUnifiedBalanceByNetwork = ({ wallets }: CoreReduxState) =>
  wallets.unifiedBalanceByNetwork;

export const selectIsUnifiedBalanceByNetworkLoading = ({
  wallets,
}: CoreReduxState) => wallets.isUnifiedBalanceByNetworkLoading;

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

export const selectIsDepositWalletsLoading = ({ wallets }: CoreReduxState) =>
  wallets.isDepositWalletsLoading;

export const selectIsUsersLoading = ({ wallets }: CoreReduxState) =>
  wallets.isUsersLoading;

export const selectIsTransactionsLoading = ({ wallets }: CoreReduxState) =>
  wallets.isTransactionsLoading;

export const selectIsAssetsLoading = ({ wallets }: CoreReduxState) =>
  wallets.isAssetsLoading;

export const selectIsUnifiedBalanceLoading = ({ wallets }: CoreReduxState) =>
  wallets.isUnifiedBalanceLoading;

export const selectIsWalletsLoading = ({ wallets }: CoreReduxState) =>
  wallets.isWalletsLoading;

export const selectUserInfo = ({ wallets }: CoreReduxState) => wallets.userInfo;
