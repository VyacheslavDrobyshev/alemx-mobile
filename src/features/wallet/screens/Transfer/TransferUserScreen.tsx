import { FC, useCallback, useState } from 'react';
import { AppIcon, AppInput, AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/rootNavigation/main/types.ts';
import { WalletRoute } from '@app/features/rootNavigation/main/constants.ts';
import { UserData } from '@app/features/wallet/redux/types.ts';
import { useAppTheme } from '@app/theme';

import { UsersList } from '@app/features/wallet/components/UsersList/UsersList.tsx';

export const TransferUserScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const onPress = useCallback(
    async (user: UserData) => {
      navigate(WalletRoute.TransferAsset, { user });
    },
    [navigate],
  );

  const [search, setSearch] = useState('');

  return (
    <AppScreen title={'Transfer'} noScroll>
      <AppInput
        placeholder={'Search coins'}
        rightContent={
          !search && <AppIcon name={'Search'} color={colors.inputLabelColor} />
        }
        value={search}
        withClear={!!search}
        onChangeText={setSearch}
      />
      <UsersList search={search} onPress={onPress} />
    </AppScreen>
  );
};
