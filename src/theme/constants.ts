import { AppColorScheme } from '@app/theme/types';
import { getInputTheme } from '@app/components/AppInput/theme';
import { getScreenTheme } from '@app/components/AppScreen/theme';
import { getCryptoCurrencyListTheme } from '@app/features/wallet/components/CryptoCurrencyList/theme';
import { getModalContainerTheme } from '@app/components/AppModal/components/AppModalContainer/theme';
import { getDialogTheme } from '@app/components/AppModal/components/AppDialog/theme';
import { getDrawerTheme } from '@app/components/AppModal/components/AppBottomDrawer/theme';
import { getCheckBoxTheme } from '@app/components/AppCheckBox/theme';
import { getWalletListTheme } from '@app/features/wallet/components/WalletsList/components/theme';
import { getBalanceListTheme } from '@app/features/wallet/components/BalancesList/components/theme';

import { getTypographyTheme } from '../components/AppText/theme';
import { getButtonTheme } from '../components/AppButton/theme';

export const coreTheme = {
  colors: (colors: AppColorScheme) => colors,
  button: getButtonTheme,
  text: getTypographyTheme,
  input: getInputTheme,
  screen: getScreenTheme,
  cryptoCurrencyList: getCryptoCurrencyListTheme,
  walletList: getWalletListTheme,
  balanceList: getBalanceListTheme,
  modalContainer: getModalContainerTheme,
  dialog: getDialogTheme,
  drawer: getDrawerTheme,
  checkBox: getCheckBoxTheme,
} as const;
