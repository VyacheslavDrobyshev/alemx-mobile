import { AppColorScheme } from '@app/theme/types';

import { AppScreenTheme } from './types';

export const getScreenTheme = (colors: AppColorScheme): AppScreenTheme => {
  return {
    default: {
      paddingHorizontal: 15,
      backgroundColor: colors.primary,
    },
  };
};
