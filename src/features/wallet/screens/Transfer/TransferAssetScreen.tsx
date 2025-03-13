import { FC, useCallback } from 'react';
import { AppScreen } from '@app/components';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/screens/Wallet/components/WalletsList/WalletsList.tsx';

export const TransferAssetScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();

  const {
    params: { user },
  } = useRoute<RouteProp<MainParamList, MainRoute.TransferAsset>>();

  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(MainRoute.TransferDetails, { user, item });
    },
    [navigate, user],
  );

  return (
    <AppScreen title={'Withdraw'} noScroll>
      <WalletsList hideZeroBalance onPress={onPress} />
    </AppScreen>
  );
};
