import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppThemeState } from './types';

const initialState: AppThemeState = {
  isDarkTheme: undefined,
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (
      state: AppThemeState,
      { payload }: PayloadAction<AppThemeState['isDarkTheme']>,
    ) => {
      state.isDarkTheme = payload;
    },
  },
});

export const {
  actions: { setDarkMode },
  reducer: theme,
} = slice;
