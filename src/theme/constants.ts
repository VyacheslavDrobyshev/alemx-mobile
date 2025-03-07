import { AppColorScheme } from '@app/theme/types';

import { getInputTheme } from '@app/components/AppInput/theme';
import { getScreenTheme } from '@app/components/AppScreen/theme';
import { getButtonTheme } from '../components/AppButton/theme';
import { getTypographyTheme } from '../components/AppText/theme';
import { getCryptoCurrencyListTheme } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/theme';

export const coreTheme = {
  colors: (colors: AppColorScheme) => colors,
  button: getButtonTheme,
  text: getTypographyTheme,
  input: getInputTheme,
  screen: getScreenTheme,
  cryptoCurrencyList: getCryptoCurrencyListTheme,
} as const;
