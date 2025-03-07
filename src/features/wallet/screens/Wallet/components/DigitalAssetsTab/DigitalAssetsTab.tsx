import { AppIcon, AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';
import { useSelector } from 'react-redux';
import { selectUserWallets } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { useAppTheme } from '@app/theme';
import { useCallback } from 'react';

export const DigitalAssetsTab = () => {
  const wallets = useSelector(selectUserWallets) ?? [];
  const { colors } = useAppTheme();

  const { openBottomDrawer } = useAppBottomDrawer();

  const onOpenSettings = useCallback(() => {
    openBottomDrawer({
      body: (
        <AppView backgroundColor={colors.primaryLightColor} height={100}>
          <AppText>dbfsdhkbfsdjfh</AppText>
        </AppView>
      ),
      closeOnBackdropPress: true,
      withCloseButton: true,
    });
  }, [colors.primaryLightColor, openBottomDrawer]);

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
        <AppIcon
          onPress={onOpenSettings}
          name={'Settings'}
          color={colors.inputLabelColor}
        />
      </AppView>
      <CryptoCurrencyList wallets={wallets} />
    </AppView>
  );
};
