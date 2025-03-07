import { createSlice } from '@reduxjs/toolkit';

import { AppUserWalletsState } from './types';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from './thunks';

const initialPersistState: AppUserWalletsState = {
  wallets: [],
  unifiedBalance: null,
  assets: [],
};

const slice = createSlice({
  name: 'wallets',
  initialState: initialPersistState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserWalletsThunk.fulfilled, (state, { payload }) => {
      state.wallets = payload;
    });
    builder.addCase(getAssetsThunk.fulfilled, (state, { payload }) => {
      state.assets = payload;
    });
    builder.addCase(getUnifiedBalanceThunk.fulfilled, (state, { payload }) => {
      state.unifiedBalance = payload;
    });
  },
});

export const { reducer: wallets } = slice;
