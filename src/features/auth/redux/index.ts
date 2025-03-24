import { createSlice } from '@reduxjs/toolkit';

import { AppAuthState } from './types';
import {
  getUserInfoThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './thunks';

const initialPersistState: AppAuthState = {
  type: null,
  accessToken: null,
  isLoading: false,
  userInfo: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialPersistState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.isLoading = false;
    });
    builder.addCase(loginThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
    builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.isLoading = false;
    });
    builder.addCase(registerThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerThunk.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(logoutThunk.fulfilled, state => {
      state.accessToken = null;
    });
  },
});

export const { reducer: auth } = slice;
