import { AppIcon, AppText, AppView } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';
import { useSelector } from 'react-redux';
import { selectUserWallets } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { useAppTheme } from '@app/theme';

export const DigitalAssetsTab = () => {
  const wallets = useSelector(selectUserWallets) ?? [];
  const { colors } = useAppTheme();
  return (
    <AppView flex={1}>
      <AccountValue />
      <AppView
        marginVertical={15}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <AppText textStyle={'regular_12_18'} color={colors.inputLabelColor}>
          Cryptocurrencies
        </AppText>
        <AppIcon name={'Settings'} color={colors.inputLabelColor} />
      </AppView>
      <CryptoCurrencyList wallets={wallets} />
    </AppView>
  );
};
