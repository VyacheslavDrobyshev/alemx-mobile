import { AppIcon, AppText, AppView, useAppBottomDrawer } from '@app/components';
import { AccountValue } from '@app/features/wallet/screens/Wallet/components/AccountValue/AccountValue';
import { useAppTheme } from '@app/theme';
import { useCallback, useEffect } from 'react';
import { SettingsModalContent } from '@app/features/wallet/modals/SettingsModalContent/SettingsModalContent';
import {
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from '@app/features/wallet/redux/thunks';
import { useAppDispatch } from '@app/redux';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';

export function DigitalAssetsTab() {
  const { colors } = useAppTheme();
  const { openBottomDrawer } = useAppBottomDrawer();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
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
      navigate(WalletRoute.WalletDetails, { item });
    },
    [navigate],
  );

  const onPressPlaceholderButton = useCallback(() => {
    navigate(WalletRoute.Deposit);
  }, [navigate]);

  useEffect(() => {
    void dispatch(getUserWalletsThunk());
    void dispatch(getUnifiedBalanceThunk());
  }, [dispatch]);

  return (
    <AppView flex={1}>
      <AccountValue />
      <AppView
        marginVertical={15}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          Cryptocurrencies
        </AppText>
        <AppIcon
          onPress={onOpenSettings}
          name="Settings"
          color={colors.inputLabelColor}
        />
      </AppView>
      <WalletsList
        hasRefreshControl
        onPressPlaceholderButton={onPressPlaceholderButton}
        hasAssets
        hideZeroBalance
        onPress={onPress}
        withBalance
      />
    </AppView>
  );
}
