import { CoreReduxState } from '@app/walletFeature/wallet/common/redux/types';

export const selectIsDarkMode = ({ theme }: CoreReduxState) =>
  theme.isDarkTheme;
