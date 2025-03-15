import { AppIcon, AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue.tsx';
import { useAppTheme } from '@app/theme';
import { useCallback, useEffect } from 'react';
import { SettingsModalContent } from '@app/features/wallet/modals/SettingsModalContent/SettingsModalContent.tsx';
import {
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from '@app/features/wallet/redux/thunks.ts';
import { useAppDispatch } from '@app/redux';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList.tsx';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';

export const DigitalAssetsTab = () => {
  const { colors } = useAppTheme();
  const { openBottomDrawer } = useAppBottomDrawer();
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const dispatch = useAppDispatch();

  const onOpenSettings = useCallback(() => {
    openBottomDrawer({
      body: <SettingsModalContent />,
      closeOnBackdropPress: true,
      title: 'Wallet settings',
    });
  }, [openBottomDrawer]);

  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(MainRoute.WalletDetails, { item });
    },
    [navigate],
  );

  const onPressPlaceholderButton = useCallback(() => {
    navigate(MainRoute.Deposit);
  }, [navigate]);

  useEffect(() => {
    dispatch(getUserWalletsThunk());
    dispatch(getUnifiedBalanceThunk());
  }, [dispatch]);

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
      <WalletsList
        onPressPlaceholderButton={onPressPlaceholderButton}
        hasAssets
        hideZeroBalance
        onPress={onPress}
        withBalance
      />
    </AppView>
  );
};
