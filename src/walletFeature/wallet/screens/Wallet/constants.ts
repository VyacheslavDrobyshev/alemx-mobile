export const walletTabs = ['Digital assets', 'Bank cards'];
export const paginationLimit = 20;
export enum WalletSettingsId {
  Balance = 'balance',
  Assets = 'assets',
}

export enum LevelFee {
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
}

export enum TransactionType {
  Swap = 'swap',
  Transfer = 'transfer',
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
}

export const walletSettings = [
  {
    id: WalletSettingsId.Balance,
    isChecked: false,
    title: 'Hide coins <1 USD',
    subTitle: 'All balances that are less than 1 dollar will be hidden.',
  },
  {
    id: WalletSettingsId.Assets,
    isChecked: false,
    title: 'Show asset networks',
    subTitle: 'Assets will show which networks they are divided into.',
  },
];

export enum SwapStatuses {
  Submitted = 'submitted',
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}
