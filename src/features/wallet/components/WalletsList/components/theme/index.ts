import { AppColorScheme } from '@app/theme/types.ts';

import { AppScreenTheme } from './types.ts';

export const getWalletListTheme = (colors: AppColorScheme): AppScreenTheme => {
  return {
    contentContainerStyle: {
      paddingBottom: 30,
      flexGrow: 1,
    },
    itemContainer: {
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 5,
      height: 56,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderColor: colors.inputBorderColor,
    },
    icon: {
      height: 30,
      width: 30,
      borderRadius: 30,
      marginRight: 15,
    },
    secondaryTextColor: {
      color: colors.inputLabelColor,
    },
  };
};
