import { WalletSettingsId } from '@app/features/wallet/screens/Wallet/constants.ts';

export type PaginationParams = {
  limit: number;
  cursor: number;
};

export type AppUserWalletsDto = {
  id: number;
  address: string;
  cryptoAsset: {
    id: number;
    name: string;
    symbol: string;
    networkId: number;
    externalId: string;
    decimals: number;
    isEssential: boolean;
    contractAddress: string;
  };
  network: {
    id: number;
    name: string;
    nativeAssetSymbol: string;
    isEvmCompatible: boolean;
    isTest: boolean;
  };
};

export type AssetBalance = {
  assetId: string;
  balance: number;
  assetName: string;
  assetSymbol: string;
  balanceUsd: number;
};

export type AppUserUnifiedBalanceDto = {
  totalBalanceUsd: number;
  balancesByAsset: {
    [key: string]: AssetBalance;
  };
};

export type AssetsData = {
  id: number;
  name: string;
  symbol: string;
  networkId: number;
  externalId: string;
  decimals: null;
  isEssential: boolean;
  contractAddress: string;
  image: string;
  network: {
    id: number;
    name: string;
    nativeAssetSymbol: string;
    isEvmCompatible: boolean;
    isTest: boolean;
  };
};

export type AppAssetsDto = {
  data: AssetsData[];
};

export type WalletSettings = {
  id: WalletSettingsId;
  title: string;
  subTitle: string;
  isChecked: boolean;
};

export type AppUserWalletsState = {
  wallets: AppUserWalletsDto[] | null;
  unifiedBalance: AppUserUnifiedBalanceDto | null;
  assets: AssetsData[];
  walletSettings: WalletSettings[];
};
