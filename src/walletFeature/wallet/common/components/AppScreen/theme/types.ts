import { AppColorValue } from '@app/walletFeature/wallet/common/theme/types';

export type ScreenTheme = {
  paddingHorizontal: number;
  backgroundColor: AppColorValue;
};

export type AppScreenTheme = {
  default: ScreenTheme;
  contentContainerStyle: {
    flexGrow: number;
  };
};
