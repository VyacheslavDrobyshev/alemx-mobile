import {
  LevelFee,
  TransactionType,
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
    [key in TransactionType]: UnionTransaction[];
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
  is_essential: boolean;
  contract_address: string;
  image: string;
  symbol: string;
  network_id: number;
  external_id: string;
  decimals: number;
  id: number;
  created_at: string;
};

export type UnionTransaction =
  | TransferTransaction
  | SwapTransaction
  | DepositTransaction
  | WithdrawalTransaction;

export type TransferTransaction = {
  external_id: string;
  transaction_type: TransactionType;
  status: string;
  id: number;
  created_at: string;
  sender_user_id: number;
  receiver_user_id: number;
  crypto_asset_id: number;
  amount: number;
  transaction_hash: string;
  updated_at: string;
  sender_user: {
    email: string;
    username: string;
    password: string;
    created_at: string;
    vault_account_id: number;
    id: number;
    updated_at: string;
  };
  receiver_user: {
    email: string;
    username: string;
    password: string;
    created_at: number;
    vault_account_id: number;
    id: number;
    updated_at: string;
  };
  crypto_asset: CryptoAssetTransaction;
};
export type SwapTransaction = {
  transaction_type: TransactionType;
  crypto_asset: CryptoAssetTransaction;
};
export type DepositTransaction = {
  transaction_type: TransactionType;
  crypto_asset: CryptoAssetTransaction;
};
export type WithdrawalTransaction = {
  external_id: string;
  transaction_type: TransactionType;
  status: string;
  created_at: string;
  user_id: number;
  external_destination_address: string;
  amount: number;
  crypto_asset_id: number;
  transaction_hash: string;
  id: number;
  updated_at: string;
  user: {
    email: string;
    username: string;
    password: string;
    created_at: string;
    vault_account_id: number;
    id: number;
    updated_at: string;
  };
  crypto_asset: CryptoAssetTransaction;
};

export type TransferTransactionDto = {
  transactions: Array<UnionTransaction>;
  next_cursor: number;
};
