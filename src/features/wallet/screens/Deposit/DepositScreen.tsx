import { FC, useCallback, useEffect } from 'react';
import { AppScreen } from '@app/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { useAppDispatch } from '@app/redux';
import { getDepositWalletsThunk } from '@app/features/wallet/redux/thunks';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList';

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
