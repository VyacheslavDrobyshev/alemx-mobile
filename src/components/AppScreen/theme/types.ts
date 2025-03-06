import { AppColorValue } from '@app/theme/types';

export type ScreenTheme = {
  paddingHorizontal: number;
  backgroundColor: AppColorValue;
};

export type AppScreenTheme = {
  default: ScreenTheme;
};
