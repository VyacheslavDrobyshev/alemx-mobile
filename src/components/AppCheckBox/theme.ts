import { AppColorScheme } from '@app/theme/types';

import type { AppCheckBoxTheme } from './types';

const height = 20;

export const toggleGap = 4;

export const getCheckBoxTheme = (colors: AppColorScheme): AppCheckBoxTheme => ({
  text: { textStyle: 'regular_14_20' },
  box: {
    height,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
  },
  unchecked: {
    borderColor: colors.inputBorderColor,
  },
  checked: {
    backgroundColor: colors.buttonPrimary,
    borderColor: colors.buttonPrimary,
  },
  icon: { color: colors.primary },
});
