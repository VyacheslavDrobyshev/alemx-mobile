import { FC, useCallback, useEffect } from 'react';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/walletFeature/wallet/components/WalletsList/WalletsList';
import { getDepositWalletsThunk } from '@app/walletFeature/wallet/redux/thunks';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';

export const WithdrawScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const dispatch = useAppDispatch();
  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(WalletRoute.WithdrawDetails, { item });
    },
    [navigate],
  );

  useEffect(() => {
    void dispatch(getDepositWalletsThunk());
  }, [dispatch]);

  const onPressPlaceholderButton = useCallback(() => {
    navigate(WalletRoute.Deposit);
  }, [navigate]);

  return (
    <AppScreen title="Withdraw" noScroll>
      <WalletsList
        isDeposit
        onPressPlaceholderButton={onPressPlaceholderButton}
        withBalance
        showNetwork
        onPress={onPress}
      />
    </AppScreen>
  );
};
