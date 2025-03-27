import React, { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { Appearance, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { isBoolean } from 'lodash';
import { useSelector } from 'react-redux';

import { darkTheme, lightTheme } from './theme';
import type { AppTheme } from './types';
import { selectIsDarkMode } from './redux/selectors';

const ThemeContext = createContext(lightTheme);

export function useAppTheme() {
  return React.useContext(ThemeContext);
}

export const useAppThemedStyles = <
  S extends { [key: string]: ViewStyle | TextStyle | ImageStyle },
  // fine here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P = any,
>(
  getStyles: (theme: AppTheme, props: P | undefined) => S,
  props?: P | undefined,
) => {
  const theme = useAppTheme();
  const styles = useMemo(
    () => getStyles(theme, props),
    [theme, getStyles, props],
  );
  return { styles, theme };
};

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const themeSetting = useSelector(selectIsDarkMode);
  const isDarkMode = isBoolean(themeSetting)
    ? themeSetting
    : Appearance.getColorScheme() === 'dark';

  return (
    <ThemeContext.Provider value={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export * from './types';
