import { AppColorScheme } from '@app/theme/types';

import { getInputTheme } from '@app/components/AppInput/theme';
import { getScreenTheme } from '@app/components/AppScreen/theme';
import { getButtonTheme } from '../components/AppButton/theme';
import { getTypographyTheme } from '../components/AppText/theme';
import { getCryptoCurrencyListTheme } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/theme';
import { getModalContainerTheme } from '@app/components/AppModal/components/AppModalContainer/theme';
import { getDialogTheme } from '@app/components/AppModal/components/AppDialog/theme';
import { getDrawerTheme } from '@app/components/AppModal/components/AppBottomDrawer/theme';
import { getCheckBoxTheme } from '@app/components/AppCheckBox/theme.ts';

export const coreTheme = {
  colors: (colors: AppColorScheme) => colors,
  button: getButtonTheme,
  text: getTypographyTheme,
  input: getInputTheme,
  screen: getScreenTheme,
  cryptoCurrencyList: getCryptoCurrencyListTheme,
  modalContainer: getModalContainerTheme,
  dialog: getDialogTheme,
  drawer: getDrawerTheme,
  checkBox: getCheckBoxTheme,
} as const;
