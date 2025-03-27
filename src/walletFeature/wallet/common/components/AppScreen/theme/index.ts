import { AppColorScheme } from '@app/walletFeature/wallet/common/theme/types';

import { AppScreenTheme } from './types';

export const getScreenTheme = (colors: AppColorScheme): AppScreenTheme => ({
  default: {
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
