import { AppColorScheme } from '@app/theme/types';

import type { AppButtonTheme } from './types';

const borderRadius = 10;
const height = 50;

export const getButtonTheme = (colors: AppColorScheme): AppButtonTheme => {
  const container = { borderRadius, height };

  return {
    neutral: {
      container: { ...container, backgroundColor: colors.white },
      text: { color: colors.text },
    },
    disabled: {
      container: {
        ...container,
        backgroundColor: colors.buttonDisabled,
      },
      text: { color: colors.buttonDisabledText },
    },
    primary: {
      container: {
        ...container,
        backgroundColor: colors.buttonPrimary,
      },
      text: { color: colors.buttonPrimaryText },
    },
    secondary: {
      container: {
        ...container,
        backgroundColor: colors.buttonSecondary,
      },
      text: { color: colors.buttonPrimary },
    },
    primaryOutlined: {
      container: {
        ...container,
        borderWidth: 1,
        borderColor: colors.buttonPrimary,
        backgroundColor: colors.transparent,
      },
      text: { color: colors.buttonPrimary },
    },
  };
};
