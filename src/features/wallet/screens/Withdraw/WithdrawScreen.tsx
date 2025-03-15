import { FC, useCallback, useEffect } from 'react';
import { AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/rootNavigation/main/types.ts';
import { WalletRoute } from '@app/features/rootNavigation/main/constants.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList.tsx';
import { getDepositWalletsThunk } from '@app/features/wallet/redux/thunks.ts';
import { useAppDispatch } from '@app/redux';

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
    dispatch(getDepositWalletsThunk());
  }, [dispatch]);

  const onPressPlaceholderButton = useCallback(() => {
    navigate(WalletRoute.Deposit);
  }, [navigate]);

  return (
    <AppScreen title={'Withdraw'} noScroll>
      <WalletsList
        isDeposit
        onPressPlaceholderButton={onPressPlaceholderButton}
        withBalance
        hideZeroBalance
        onPress={onPress}
      />
    </AppScreen>
  );
};
