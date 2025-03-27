import { combineReducers } from '@reduxjs/toolkit';
import { theme } from '@app/walletFeature/wallet/common/theme/redux';
import { auth } from '@app/walletFeature/auth/redux';
import { wallets } from '@app/walletFeature/wallet/redux';

export const reducers = combineReducers({
  theme,
  auth,
  wallets,
});
