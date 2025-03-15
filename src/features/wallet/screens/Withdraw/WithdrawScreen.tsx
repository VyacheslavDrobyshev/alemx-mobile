import { FC, useCallback, useEffect } from 'react';
import { AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList.tsx';
import { getDepositWalletsThunk } from '@app/features/wallet/redux/thunks.ts';
import { useAppDispatch } from '@app/redux';

export const WithdrawScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const dispatch = useAppDispatch();
  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(MainRoute.WithdrawDetails, { item });
    },
    [navigate],
  );

  useEffect(() => {
    dispatch(getDepositWalletsThunk());
  }, [dispatch]);

  const onPressPlaceholderButton = useCallback(() => {
    navigate(MainRoute.Deposit);
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
