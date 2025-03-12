import { FC, useCallback } from 'react';
import { AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/screens/Wallet/components/WalletsList/WalletsList.tsx';

export const WithdrawScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();

  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(MainRoute.WithdrawDetails, { item });
    },
    [navigate],
  );

  return (
    <AppScreen title={'Withdraw'} noScroll>
      <WalletsList onPress={onPress} />
    </AppScreen>
  );
};
