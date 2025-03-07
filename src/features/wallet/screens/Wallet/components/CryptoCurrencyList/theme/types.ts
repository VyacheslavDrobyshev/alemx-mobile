import { AppColorValue } from '@app/theme/types';

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
