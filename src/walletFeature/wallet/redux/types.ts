import {
  LevelFee,
  SwapStatuses,
  TransactionType,
  WalletSettingsId,
} from '@app/walletFeature/wallet/screens/Wallet/constants';

export type PaginationParams = {
  limit: number;
  cursor: number;
  is_essential?: boolean;
  search?: string;
  sort_by?: string;
};

export type TransactionPaginationParams = {
  limit: number;
  cursor?: string;
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
  network: AssetNetwork;
};

export type AssetBalance = {
  assetExternalId: string;
  assetId: number;
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
  image?: string;
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

export type UnifiedBalanceNetwork = {
  network: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    nativeAssetSymbol: string;
    isEvmCompatible: boolean;
    isTest: boolean;
    image: string;
  };
  totalBalanceByNetwork: {
    balance: string;
    balanceUsd: string;
  };
  asset: {
    assetExternalId: string;
    assetId: number;
    decimals: number;
    balance: string;
    assetName: string;
    assetSymbol: string;
    balanceUsd: string;
  };
};

export type UnifiedBalanceByNetworkDto = {
  symbol: string;
  name: string;
  image: string;
  networks: UnifiedBalanceNetwork[];
  totalBalanceAcrossNetworks: {
    balance: 'string';
    balanceUsd: 'string';
  };
};

export type AppUserWalletsState = {
  userInfo: UserInfoDto | null;
  wallets: AppUserWalletsDto[] | null;
  isWalletsLoading: boolean;
  depositWallets: AppUserWalletsDto[] | null;
  isDepositWalletsLoading: boolean;
  unifiedBalance: AppUserUnifiedBalanceDto | null;
  unifiedBalanceByNetwork: UnifiedBalanceByNetworkDto[] | null;
  isUnifiedBalanceByNetworkLoading: boolean;
  isUnifiedBalanceLoading: boolean;
  assets: AppAssetsDto;
  isAssetsLoading: boolean;
  walletSettings: WalletSettings[];
  users: AppUsersDto;
  isUsersLoading: boolean;
  transactionsByType: {
    [key in TransactionType]: {
      data: UnionTransaction[];
      next_cursor: [string, number] | undefined;
    };
  };
  isTransactionsLoading: boolean;
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

export type NetworkFeeDto = {
  networkFeeNative: string;
  networkFeeConverted: string;
  transactionType: TransactionType;
};

export type DepositFeeDto = NetworkFeeDto;

export type CryptoAssetTransaction = {
  name: string;
  isEssential: boolean;
  contractAddress: string;
  image: string;
  symbol: string;
  networkId: number;
  externalId: string;
  decimals: number;
  id: number;
  createdAt: string;
};

export type UnionTransaction =
  | TransferTransaction
  | SwapTransaction
  | DepositTransaction
  | WithdrawalTransaction;

export type TransferTransaction = {
  externalId: string;
  transactionType: TransactionType;
  status: SwapStatuses;
  id: number;
  createdAt: string;
  cryptoAssetId: number;
  amount: number;
  amountUsd: number;
  networkFee: string;
  networkFeeUsd: string;
  transactionHash: string;
  updatedAt: string;
  senderUser: {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    vaultAccountId: number;
    id: number;
    updatedAt: string;
  };
  receiverUser: {
    email: string;
    username: string;
    password: string;
    createdAt: number;
    vaultAccountId: number;
    id: number;
    updatedAt: string;
  };
  cryptoAsset: CryptoAssetTransaction;
  user: string | null;
  externalSenderAddress: string | null;
  externalDestinationAddress: string | null;
  toCryptoAssetId: string | null;
  toCryptoAsset: string | null;
  toAmount: string | null;
  toAmountUsd: string | null;
  commissionTotalAmount: string;
  commissions: {
    id: number;
    created: string | null;
    updated: string | null;
    createdAt: string;
    updatedAt: string;
    commissionAmount: number;
    commissionType: {
      id: number;
      created: string | null;
      updated: string | null;
      createdAt: string;
      updatedAt: string;
      type: string;
      commissionPercentage: number;
    };
  }[];
};
export type SwapTransaction = {
  id: number;
  createdAt: string;
  updatedAt: string;
  externalId: string;
  cryptoAssetId: number;
  transactionHash: string;
  status: SwapStatuses;
  senderUser: null;
  receiverUser: null;
  externalSenderAddress: null;
  externalDestinationAddress: null;
  toCryptoAssetId: number;
  toCryptoAsset: CryptoAssetTransaction;
  toAmount: number;
  toAmountUsd: number;
  transactionType: TransactionType;
  cryptoAsset: CryptoAssetTransaction;
  amount: number;
  amountUsd: number;
  networkFee: string;
  networkFeeUsd: string;
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    username: string;
    email: string;
    vaultAccountId: number;
  };
  commissionTotalAmount: string;
  commissions: {
    id: number;
    created: string | null;
    updated: string | null;
    createdAt: string;
    updatedAt: string;
    commissionAmount: number;
    commissionType: {
      id: number;
      created: string | null;
      updated: string | null;
      createdAt: string;
      updatedAt: string;
      type: string;
      commissionPercentage: number;
    };
  }[];
};
export type DepositTransaction = {
  transactionType: TransactionType;
  cryptoAsset: CryptoAssetTransaction;
  createdAt: string;
  amount: number;
  amountUsd: number;
  networkFee: string;
  networkFeeUsd: string;
  externalId: string;
  status: SwapStatuses;
  id: number;
  cryptoAssetId: 121;
  transactionHash: string;
  updatedAt: string;
  userId: number;
  externalSenderAddress: string;
  user: {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    vaultAccountId: number;
    id: number;
    updatedAt: string;
    cryptoAsset: CryptoAssetTransaction;
  };
  commissionTotalAmount: string;
  commissions: {
    id: number;
    created: string | null;
    updated: string | null;
    createdAt: string;
    updatedAt: string;
    commissionAmount: number;
    commissionType: {
      id: number;
      created: string | null;
      updated: string | null;
      createdAt: string;
      updatedAt: string;
      type: string;
      commissionPercentage: number;
    };
  }[];
};
export type WithdrawalTransaction = {
  externalId: string;
  transactionType: TransactionType;
  status: SwapStatuses;
  createdAt: string;
  userId: number;
  externalDestinationAddress: string;
  amount: number;
  amountUsd: number;
  networkFee: string;
  networkFeeUsd: string;
  cryptoAssetId: number;
  transactionHash: string;
  id: number;
  updatedAt: string;
  user: {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    vaultAccountId: number;
    id: number;
    updatedAt: string;
  };
  cryptoAsset: CryptoAssetTransaction;
  commissionTotalAmount: string;
  commissions: {
    id: number;
    created: string | null;
    updated: string | null;
    createdAt: string;
    updatedAt: string;
    commissionAmount: number;
    commissionType: {
      id: number;
      created: string | null;
      updated: string | null;
      createdAt: string;
      updatedAt: string;
      type: string;
      commissionPercentage: number;
    };
  }[];
};

export type TransferTransactionDto = {
  data: UnionTransaction[];
  next_cursor: [string, number];
};

export type UserInfoDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  vaultAccountId: string;
};

export type PlatformFeeDto = {
  commissionPercentage: string;
  commissionAmount: string;
};

export type PlatformFeeParams = {
  amount: string;
  transaction_type: TransactionType;
};

export type AppLoginError = {
  detail: string;
};
