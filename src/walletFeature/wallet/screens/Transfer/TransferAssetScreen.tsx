import { FC, useCallback } from 'react';
import { AppScreen } from '@app/walletFeature/wallet/common/components';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { BalancesList } from '@app/walletFeature/wallet/components/BalancesList/BalancesList';
import { UnifiedBalanceByNetworkDto } from '@app/walletFeature/wallet/redux/types';

export const TransferAssetScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const {
    params: { user },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.TransferAsset>>();

  const onPress = useCallback(
    (item: UnifiedBalanceByNetworkDto) => {
      navigate(WalletRoute.TransferDetails, { user, item });
    },
    [navigate, user],
  );

  return (
    <AppScreen title="Transfer" noScroll>
      <BalancesList
        title="Coin list"
        inputPlaceholder="Search coins"
        withSearch
        hideZeroBalance
        onPress={onPress}
      />
    </AppScreen>
  );
};
