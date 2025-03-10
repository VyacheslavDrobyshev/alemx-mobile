import { FC, useCallback, useState } from 'react';
import { AppInput, AppScreen, useAppBottomDrawer } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { NetworksModalContent } from '@app/features/wallet/modals/NetworksModalContent/NetworksModalContent.tsx';

export const DepositScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const { openBottomDrawer } = useAppBottomDrawer();

  const onPress = useCallback(
    (network: string, item?: AssetsData) => {
      navigate(MainRoute.DepositDetails, { item, network });
    },
    [navigate],
  );

  const onChooseNetwork = useCallback(
    (item: AssetsData) => {
      openBottomDrawer({
        body: <NetworksModalContent item={item} onPress={onPress} />,
        closeOnBackdropPress: true,
        title: 'Choose network',
      });
    },
    [onPress, openBottomDrawer],
  );

  const [search, setSearch] = useState('');

  return (
    <AppScreen title={'Deposit'} noScroll>
      <AppInput onChangeText={setSearch} />
      <CryptoCurrencyList search={search} onPress={onChooseNetwork} />
    </AppScreen>
  );
};
