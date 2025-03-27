import { AppColorValue } from '@app/walletFeature/wallet/common/theme/types';

export type AppScreenTheme = {
  contentContainerStyle: {
    paddingBottom: number;
    flexGrow: number;
  };
  itemContainer: {
    borderWidth: number;
    borderRadius: number;
    marginBottom: number;
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderColor: AppColorValue;
  };
  icon: {
    height: number;
    width: number;
    borderRadius: number;
    marginRight: number;
  };
  secondaryTextColor: {
    color: AppColorValue;
  };
};
