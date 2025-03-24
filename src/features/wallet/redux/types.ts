import {
  LevelFee,
  TransactionType,
  WalletSettingsId,
} from '@app/features/wallet/screens/Wallet/constants';

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
  isWalletsLoading: boolean;
  depositWallets: AppUserWalletsDto[] | null;
  isDepositWalletsLoading: boolean;
  unifiedBalance: AppUserUnifiedBalanceDto | null;
  isUnifiedBalanceLoading: boolean;
  assets: AppAssetsDto;
  isAssetsLoading: boolean;
  walletSettings: WalletSettings[];
  users: AppUsersDto;
  isUsersLoading: boolean;
  transactionsByType: {
    [key in TransactionType]: { data: UnionTransaction[]; next_cursor: number };
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
  status: string;
  id: number;
  createdAt: string;
  cryptoAssetId: number;
  amount: number;
  amountUsd: number;
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
};
export type SwapTransaction = {
  transactionType: TransactionType;
  cryptoAsset: CryptoAssetTransaction;
  createdAt: string;
  amount: number;
  amountUsd: number;
  //   todo add more props
};
export type DepositTransaction = {
  transactionType: TransactionType;
  cryptoAsset: CryptoAssetTransaction;
  createdAt: string;
  amount: number;
  amountUsd: number;
  externalId: string;
  status: string;
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
};
export type WithdrawalTransaction = {
  externalId: string;
  transactionType: TransactionType;
  status: string;
  createdAt: string;
  userId: number;
  externalDestinationAddress: string;
  amount: number;
  amountUsd: number;
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
};

export type TransferTransactionDto = {
  data: UnionTransaction[];
  next_cursor: number;
};
