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

export type AppAssetsDto = {
  id: string;
  name: string;
  type: string;
  contractAddress: string;
  nativeAsset: string;
  decimals: null;
};

export type AppUserWalletsState = {
  wallets: AppUserWalletsDto[] | null;
  unifiedBalance: AppUserUnifiedBalanceDto | null;
  assets: AppAssetsDto[] | null;
};
