import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { FC, useCallback } from 'react';
import { logoutThunk } from '@app/walletFeature/auth/redux/thunks';
import { AppScreenProps } from '@app/walletFeature/wallet/common/components/AppScreen/components/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';

export const HeaderComponent: FC<AppScreenProps> = ({ title }) => {
  const { canGoBack, goBack, navigate } =
    useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();

  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    void dispatch(logoutThunk());
  }, [dispatch]);

  const openNetworkLogger = () => {
    navigate(WalletRoute.NetworkLogger);
  };

  return (
    <AppView
      height={50}
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={20}
      marginBottom={10}
      backgroundColor={colors.primary}>
      <AppTouchable
        disabled={!canGoBack()}
        onPress={goBack}
        flexDirection="row"
        alignItems="center">
        {canGoBack() && (
          <AppIcon marginRight={5} name="ArrowLeft" color={colors.white} />
        )}
        {!!title && <AppText textStyle="regular_16_20">{title}</AppText>}
      </AppTouchable>
      <AppText onPress={openNetworkLogger} textStyle="regular_16_20">
        Network
      </AppText>
      <AppText onPress={onLogout} textStyle="regular_16_20">
        Logout
      </AppText>
    </AppView>
  );
};
