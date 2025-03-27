import { FC, useCallback, useEffect } from 'react';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { getDepositWalletsThunk } from '@app/walletFeature/wallet/redux/thunks';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/walletFeature/wallet/components/WalletsList/WalletsList';

export const DepositScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const dispatch = useAppDispatch();

  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(WalletRoute.DepositDetails, { item });
    },
    [navigate],
  );

  useEffect(() => {
    void dispatch(getDepositWalletsThunk());
  }, [dispatch]);

  return (
    <AppScreen title="Deposit" noScroll>
      <WalletsList showNetwork isDeposit onPress={onPress} />
    </AppScreen>
  );
};
