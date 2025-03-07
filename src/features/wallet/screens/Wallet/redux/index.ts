import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppUserWalletsState, WalletSettings } from './types';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from './thunks';
import { walletSettings } from '@app/features/wallet/screens/Wallet/constants.ts';

const initialPersistState: AppUserWalletsState = {
  wallets: [],
  unifiedBalance: null,
  assets: [],
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
    builder.addCase(getAssetsThunk.fulfilled, (state, { payload, meta }) => {
      if (meta.arg.cursor === 1) {
        state.assets = payload;
      } else {
        state.assets = [...state.assets, ...payload];
      }
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
