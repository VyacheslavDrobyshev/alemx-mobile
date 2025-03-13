import {
  LevelFee,
  WalletSettingsId,
} from '@app/features/wallet/screens/Wallet/constants.ts';

export type PaginationParams = {
  limit: number;
  cursor: number;
  is_essential?: boolean;
  search?: string;
  sort_by?: string;
};

export type AppCreateWalletParams = {
  assetsIds: number[];
};

export type AppWithdrawParams = {
  assetId: number;
  amount: string;
  feeLevel: LevelFee;
  receiverOneTimeAddress: string;
};

export type AppTransferParams = {
  assetId: number;
  amount: string;
  feeLevel: LevelFee;
  receiverUserId: number;
};

export type AppUserWalletsDto = {
  id: number;
  address: string;
  cryptoAsset: AssetsData;
  network: {
    id: number;
    name: string;
    nativeAssetSymbol: string;
    isEvmCompatible: boolean;
    isTest: boolean;
    image?: string;
  };
};

export type AssetBalance = {
  assetId: string;
  balance: string;
  assetName: string;
  assetSymbol: string;
  balanceUsd: string;
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
  network: AssetNetwork;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
};

export type AssetNetwork = {
  id: number;
  name: string;
  nativeAssetSymbol: string;
  isEvmCompatible: boolean;
  isTest: boolean;
};
export type AppAssetsDto = {
  data: AssetsData[];
  next_cursor: number;
};

export type AppUsersDto = {
  data: UserData[];
  next_cursor: number;
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
  assets: AppAssetsDto;
  walletSettings: WalletSettings[];
  users: AppUsersDto;
};

export type AppWithdrawError = {
  detail:
    | {
        message: string;
        available_balance: number;
        requested_withdrawal: number;
        estimated_fee: number;
        total_required: number;
      }
    | string;
};

export type AppFeeDto = {
  [p: string]: {
    feePerByte: number | null;
    gasPrice: number | null;
    gasLimit: number | null;
    networkFee: number;
    baseFee: number | null;
    priorityFee: number | null;
    maxFeePerGasDelta: number | null;
    l1Fee: number | null;
  };
};
