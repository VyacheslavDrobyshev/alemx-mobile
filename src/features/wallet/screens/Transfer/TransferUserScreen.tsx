import { FC, useCallback, useState } from 'react';
import { AppIcon, AppInput, AppScreen } from '@app/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { UserData } from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';
import { UsersList } from '@app/features/wallet/components/UsersList/UsersList';

export const TransferUserScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { colors } = useAppTheme();
  const onPress = useCallback(
    (user: UserData) => {
      navigate(WalletRoute.TransferAsset, { user });
    },
    [navigate],
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
      <UsersList search={search} onPress={onPress} />
    </AppScreen>
  );
};
