import { ObjectValues } from '@app/walletFeature/wallet/common/types';

import { coreTheme } from './constants';
import { darkThemeColors, lightThemeColors } from './colors';

type ComponentThemes = typeof coreTheme;

export type ThemeKeys = keyof typeof coreTheme;

export type AppTheme = { [key in ThemeKeys]: ReturnType<ComponentThemes[key]> };

export type AppColorScheme = typeof lightThemeColors | typeof darkThemeColors;

export type AppColorValue = ObjectValues<AppColorScheme>;
