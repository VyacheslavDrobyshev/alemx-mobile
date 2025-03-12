import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppUserWalletsState, WalletSettings } from './types.ts';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from './thunks.ts';
import { walletSettings } from '@app/features/wallet/screens/Wallet/constants.ts';
import { logoutThunk } from '@app/features/auth/redux/thunks.ts';

const initialPersistState: AppUserWalletsState = {
  wallets: [],
  unifiedBalance: null,
  assets: {
    data: [],
    nextCursor: 1,
  },
  walletSettings: walletSettings,
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
      state.assets.nextCursor = payload.nextCursor;
    });
    builder.addCase(getUnifiedBalanceThunk.fulfilled, (state, { payload }) => {
      state.unifiedBalance = payload;
    });
  },
});

export const {
  reducer: wallets,
  actions: { updateWalletSettings },
} = slice;
