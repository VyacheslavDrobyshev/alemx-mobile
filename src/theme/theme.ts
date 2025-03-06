import { AppColorScheme } from '@app/theme/types';
import { lightThemeColors, darkThemeColors } from '@app/theme/colors';

import { coreTheme } from './constants';
import type { AppTheme, ThemeKeys } from './types';

const getTheme = (colors: AppColorScheme): AppTheme =>
  (Object.keys(coreTheme) as ThemeKeys[]).reduce(
    (acc, next) => ({ ...acc, [next]: coreTheme[next](colors) }),
    {} as AppTheme,
  );

export const lightTheme = getTheme(lightThemeColors);

export const darkTheme = getTheme(darkThemeColors);
