import { AppColorValue } from '@app/walletFeature/wallet/common/theme/types';

export type BottomDrawerTheme = {
  container: {
    backgroundColor: AppColorValue;
    maxHeight: number;
    minHeight: number;
    borderTopRadius: number;
    paddingHorizontal: number;
  };
  icon: {
    backgroundColor: AppColorValue;
  };
};
