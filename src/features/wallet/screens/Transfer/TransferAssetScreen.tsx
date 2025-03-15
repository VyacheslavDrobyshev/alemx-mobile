import { FC, useCallback } from 'react';
import { AppScreen } from '@app/components';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/features/rootNavigation/main/types.ts';
import { WalletRoute } from '@app/features/rootNavigation/main/constants.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList.tsx';

export const TransferAssetScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const {
    params: { user },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransferAsset>>();

  const onPress = useCallback(
    (item: ModifiedWallet) => {
      navigate(WalletRoute.TransferDetails, { user, item });
    },
    [navigate, user],
  );

  return (
    <AppScreen title={'Transfer'} noScroll>
      <WalletsList withBalance hideZeroBalance onPress={onPress} />
    </AppScreen>
  );
};
