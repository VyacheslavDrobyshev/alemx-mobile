import { AppColorScheme } from '@app/walletFeature/wallet/common/theme/types';
import { getInputTheme } from '@app/walletFeature/wallet/common/components/AppInput/theme';
import { getScreenTheme } from '@app/walletFeature/wallet/common/components/AppScreen/theme';
import { getCryptoCurrencyListTheme } from '@app/walletFeature/wallet/components/CryptoCurrencyList/theme';
import { getModalContainerTheme } from '@app/walletFeature/wallet/common/components/AppModal/components/AppModalContainer/theme';
import { getDialogTheme } from '@app/walletFeature/wallet/common/components/AppModal/components/AppDialog/theme';
import { getDrawerTheme } from '@app/walletFeature/wallet/common/components/AppModal/components/AppBottomDrawer/theme';
import { getCheckBoxTheme } from '@app/walletFeature/wallet/common/components/AppCheckBox/theme';
import { getWalletListTheme } from '@app/walletFeature/wallet/components/WalletsList/components/theme';
import { getBalanceListTheme } from '@app/walletFeature/wallet/components/BalancesList/components/theme';

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
