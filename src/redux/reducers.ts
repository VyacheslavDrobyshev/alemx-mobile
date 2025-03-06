import { combineReducers } from '@reduxjs/toolkit';
import { theme } from '@app/theme/redux';
import { auth } from '@app/features/auth/redux';

export const reducers = combineReducers({
  theme,
  auth,
});
