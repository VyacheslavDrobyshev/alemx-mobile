import { AppIcon, AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { useAppTheme } from '@app/theme';
import { useCallback } from 'react';
import { SettingsModalContent } from '@app/features/wallet/screens/Wallet/components/SettingsModalContent/SettingsModalContent.tsx';

export const DigitalAssetsTab = () => {
  const { colors } = useAppTheme();
  const { openBottomDrawer } = useAppBottomDrawer();

  const onOpenSettings = useCallback(() => {
    openBottomDrawer({
      body: <SettingsModalContent />,
      closeOnBackdropPress: true,
      withCloseButton: true,
      title: 'Wallet settings',
    });
  }, [openBottomDrawer]);

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
      <CryptoCurrencyList />
    </AppView>
  );
};
