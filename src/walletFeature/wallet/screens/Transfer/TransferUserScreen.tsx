import { FC, useCallback, useState } from 'react';
import { AppIcon, AppInput, AppScreen } from '@app/walletFeature/wallet/common/components';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { UserData } from '@app/walletFeature/wallet/redux/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { UsersList } from '@app/walletFeature/wallet/components/UsersList/UsersList';

export const TransferUserScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { params } =
    useRoute<RouteProp<WalletParamList, WalletRoute.TransferUser>>();
  const { colors } = useAppTheme();
  const onPress = useCallback(
    (user: UserData) => {
      if (params?.item) {
        navigate(WalletRoute.TransferDetails, { user, item: params.item });
      } else {
        navigate(WalletRoute.TransferAsset, { user });
      }
    },
    [navigate, params?.item],
  );

  const [search, setSearch] = useState('');

  return (
    <AppScreen title="Transfer" noScroll>
      <AppInput
        placeholder="Search user"
        rightContent={
          !search && <AppIcon name="Search" color={colors.inputLabelColor} />
        }
        value={search}
        withClear={!!search}
        onChangeText={setSearch}
      />
      <UsersList title="Friends list" search={search} onPress={onPress} />
    </AppScreen>
  );
};
