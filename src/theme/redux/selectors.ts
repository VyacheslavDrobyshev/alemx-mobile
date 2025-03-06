import { CoreReduxState } from '@app/redux/types';

export const selectIsDarkMode = ({ theme }: CoreReduxState) =>
  theme.isDarkTheme;
