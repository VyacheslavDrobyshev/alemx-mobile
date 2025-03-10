import { AppIcon, AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { useAppTheme } from '@app/theme';
import { useCallback } from 'react';
import { SettingsModalContent } from '@app/features/wallet/modals/SettingsModalContent/SettingsModalContent.tsx';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';

export const DigitalAssetsTab = () => {
  const { colors } = useAppTheme();
  const { openBottomDrawer } = useAppBottomDrawer();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();

  const onOpenSettings = useCallback(() => {
    openBottomDrawer({
      body: <SettingsModalContent />,
      closeOnBackdropPress: true,
      title: 'Wallet settings',
    });
  }, [openBottomDrawer]);

  const onPress = useCallback(
    (item: AssetsData) => {
      navigate(MainRoute.WalletDetails, { item });
    },
    [navigate],
  );

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
      <CryptoCurrencyList onPress={onPress} />
    </AppView>
  );
};
