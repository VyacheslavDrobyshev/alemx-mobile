import { AppUserWalletsState, WalletSettings } from './types.ts';
import {
  getAssetsThunk,
  getTransactionsThunk,
  getUnifiedBalanceThunk,
  getUsersThunk,
  getUserWalletsThunk,
} from './thunks.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TransactionType,
  walletSettings,
} from '@app/features/wallet/screens/Wallet/constants.ts';
import { logoutThunk } from '@app/features/auth/redux/thunks.ts';


const initialPersistState: AppUserWalletsState = {
  wallets: [],
  unifiedBalance: null,
  assets: {
    data: [],
    next_cursor: 1,
  },
  walletSettings: walletSettings,
  users: {
    data: [],
    next_cursor: 1,
  },
  transactionsByType: {
    [TransactionType.Base]: [],
    [TransactionType.Deposit]: [],
    [TransactionType.Withdrawal]: [],
    [TransactionType.Transfer]: [],
  },
  transactionsByCoin: {},
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
    builder.addCase(getUserWalletsThunk.fulfilled, (state, { payload }) => {
      state.wallets = payload;
    });
    builder.addCase(logoutThunk.fulfilled, state => {
      state.assets = initialPersistState.assets;
      state.wallets = initialPersistState.wallets;
      state.unifiedBalance = initialPersistState.unifiedBalance;
      state.walletSettings = initialPersistState.walletSettings;
    });
    builder.addCase(getAssetsThunk.fulfilled, (state, { payload, meta }) => {
      if (meta.arg.cursor === 1) {
        state.assets.data = payload.data;
      } else {
        state.assets.data = [...state.assets.data, ...payload.data];
      }
      state.assets.next_cursor = payload.next_cursor;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, { payload, meta }) => {
      if (meta.arg.cursor === 1) {
        state.users.data = payload.data;
      } else {
        state.users.data = [...state.users.data, ...payload.data];
      }
      state.users.next_cursor = payload.next_cursor;
    });
    builder.addCase(getUnifiedBalanceThunk.fulfilled, (state, { payload }) => {
      state.unifiedBalance = payload;
    });
    builder.addCase(
      getTransactionsThunk.fulfilled,
      (state, { payload, meta }) => {
        state.transactionsByType[meta.arg.transaction_type] =
          payload.transactions;
      },
    );
  },
});

export const {
  reducer: wallets,
  actions: { updateWalletSettings },
} = slice;
