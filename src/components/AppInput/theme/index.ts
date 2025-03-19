import { AppColorScheme } from '@app/theme/types';

import { InputTheme } from './types';

export const getInputTheme = (colors: AppColorScheme): InputTheme => ({
  textStyle: 'regular_16_20',
  container: {
    height: 40,
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  error: {
    borderColor: colors.inputErrorColor,
  },
  default: {
    borderColor: colors.inputBorderColor,
  },
  disabled: {
    borderColor: colors.inputBorderColor,
    color: colors.textSecondary,
  },
  filled: {
    borderColor: colors.inputBorderColor,
  },
  active: {
    borderColor: colors.inputActiveColor,
  },
  notActive: {
    backgroundColor: colors.primaryLightColor,
    borderColor: colors.transparent,
    color: colors.inputBorderColor,
  },
  placeholder: {
    color: colors.inputItemColor,
    marginBottom: 10,
  },
  errorMessage: {
    backgroundColor: colors.transparent,
    color: colors.inputErrorColor,
  },
});
