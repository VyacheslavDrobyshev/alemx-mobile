import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TransactionType,
  walletSettings,
} from '@app/walletFeature/wallet/screens/Wallet/constants';
import { logoutThunk } from '@app/walletFeature/auth/redux/thunks';

import {
  getAssetsThunk,
  getDepositWalletsThunk,
  getTransactionsThunk,
  getUnifiedBalanceByNetworkThunk,
  getUnifiedBalanceThunk,
  getUserInfoThunk,
  getUsersThunk,
  getUserWalletsThunk,
} from './thunks';
import { AppUserWalletsState, WalletSettings } from './types';

const initialPersistState: AppUserWalletsState = {
  userInfo: null,
  wallets: [],
  isWalletsLoading: false,
  depositWallets: [],
  isDepositWalletsLoading: false,
  unifiedBalance: null,
  unifiedBalanceByNetwork: null,
  isUnifiedBalanceByNetworkLoading: false,
  isUnifiedBalanceLoading: false,
  assets: {
    data: [],
    next_cursor: 1,
  },
  isAssetsLoading: false,
  walletSettings,
  users: {
    data: [],
    next_cursor: 1,
  },
  isUsersLoading: false,
  transactionsByType: {
    [TransactionType.Swap]: {
      data: [],
      next_cursor: undefined,
    },
    [TransactionType.Deposit]: {
      data: [],
      next_cursor: undefined,
    },
    [TransactionType.Withdrawal]: {
      data: [],
      next_cursor: undefined,
    },
    [TransactionType.Transfer]: {
      data: [],
      next_cursor: undefined,
    },
  },
  isTransactionsLoading: false,
};

const slice = createSlice({
  name: 'wallets',
  initialState: initialPersistState,
  reducers: {
    updateWalletSettings: (
      state,
      { payload }: PayloadAction<WalletSettings[]>,
    ) => {
      state.walletSettings = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
    builder.addCase(getUserWalletsThunk.fulfilled, (state, { payload }) => {
      state.isWalletsLoading = false;
      state.wallets = payload;
    });
    builder.addCase(getUserWalletsThunk.rejected, state => {
      state.isWalletsLoading = false;
    });
    builder.addCase(getUserWalletsThunk.pending, state => {
      state.isWalletsLoading = true;
    });

    builder.addCase(getDepositWalletsThunk.fulfilled, (state, { payload }) => {
      state.isDepositWalletsLoading = false;
      state.depositWallets = payload;
    });
    builder.addCase(getDepositWalletsThunk.rejected, state => {
      state.isDepositWalletsLoading = false;
    });
    builder.addCase(getDepositWalletsThunk.pending, state => {
      state.isDepositWalletsLoading = true;
    });

    builder.addCase(getAssetsThunk.fulfilled, (state, { payload, meta }) => {
      state.isAssetsLoading = false;
      if (meta.arg?.cursor === 1) {
        state.assets.data = payload.data;
      } else {
        state.assets.data = [...state.assets.data, ...payload.data];
      }
      state.assets.next_cursor = payload.next_cursor;
    });
    builder.addCase(getAssetsThunk.rejected, state => {
      state.isAssetsLoading = false;
    });
    builder.addCase(getAssetsThunk.pending, state => {
      state.isAssetsLoading = true;
    });

    builder.addCase(getUsersThunk.fulfilled, (state, { payload, meta }) => {
      state.isUsersLoading = false;
      if (meta.arg.cursor === 1) {
        state.users.data = payload.data;
      } else {
        state.users.data = [...state.users.data, ...payload.data];
      }
      state.users.next_cursor = payload.next_cursor;
    });
    builder.addCase(getUsersThunk.rejected, state => {
      state.isUsersLoading = false;
    });
    builder.addCase(getUsersThunk.pending, (state, { meta }) => {
      if (meta.arg.cursor === 1) {
        state.isUsersLoading = true;
      }
    });

    builder.addCase(
      getUnifiedBalanceByNetworkThunk.fulfilled,
      (state, { payload }) => {
        state.unifiedBalanceByNetwork = payload;
        state.isUnifiedBalanceByNetworkLoading = false;
      },
    );
    builder.addCase(getUnifiedBalanceByNetworkThunk.rejected, state => {
      state.isUnifiedBalanceByNetworkLoading = false;
    });
    builder.addCase(getUnifiedBalanceByNetworkThunk.pending, state => {
      state.isUnifiedBalanceByNetworkLoading = true;
    });

    builder.addCase(getUnifiedBalanceThunk.fulfilled, (state, { payload }) => {
      state.isUnifiedBalanceLoading = false;
      state.unifiedBalance = payload;
    });
    builder.addCase(getUnifiedBalanceThunk.rejected, state => {
      state.isUnifiedBalanceLoading = false;
    });
    builder.addCase(getUnifiedBalanceThunk.pending, state => {
      state.isUnifiedBalanceLoading = true;
    });

    builder.addCase(
      getTransactionsThunk.fulfilled,
      (state, { payload, meta }) => {
        state.isTransactionsLoading = false;
        if (meta.arg.cursor === undefined) {
          state.transactionsByType[meta.arg.transaction_type].data =
            payload.data;
        } else {
          state.transactionsByType[meta.arg.transaction_type].data = [
            ...state.transactionsByType[meta.arg.transaction_type].data,
            ...payload.data,
          ];
        }
        state.transactionsByType[meta.arg.transaction_type].next_cursor =
          payload.next_cursor;
      },
    );
    builder.addCase(getTransactionsThunk.rejected, state => {
      state.isTransactionsLoading = false;
    });
    builder.addCase(getTransactionsThunk.pending, (state, { meta }) => {
      if (meta.arg.cursor === undefined) {
        state.isTransactionsLoading = true;
      }
    });

    builder.addCase(logoutThunk.fulfilled, state => {
      state.assets = initialPersistState.assets;
      state.wallets = initialPersistState.wallets;
      state.unifiedBalance = initialPersistState.unifiedBalance;
      state.walletSettings = initialPersistState.walletSettings;
      state.depositWallets = initialPersistState.depositWallets;
      state.transactionsByType = initialPersistState.transactionsByType;
      state.users = initialPersistState.users;
    });
  },
});

export const {
  reducer: wallets,
  actions: { updateWalletSettings },
} = slice;
