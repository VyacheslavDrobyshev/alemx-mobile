import { AppColorValue } from '@app/theme/types';

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
