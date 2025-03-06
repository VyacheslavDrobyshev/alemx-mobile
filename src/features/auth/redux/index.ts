import { createSlice } from '@reduxjs/toolkit';

import { AppAuthState } from './types';
import { loginThunk, logoutThunk, registerThunk } from './thunks';
import storage from 'react-native-encrypted-storage';

const initialPersistState: AppAuthState = {
  accessToken: null,
  isLoading: false,
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
      storage.removeItem('accessToken');
    });
  },
});

export const { reducer: auth } = slice;
