import { FC, useCallback, useState } from 'react';
import { AppIcon, AppInput, AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';
import { CryptoCurrencyList } from '@app/features/wallet/screens/Deposit/CryptoCurrencyList/CryptoCurrencyList.tsx';
import { AssetsData } from '@app/features/wallet/redux/types.ts';
import { useAppTheme } from '@app/theme';
import { isThunkPayload, useAppDispatch } from '@app/redux';
import { createUserWalletsThunk } from '@app/features/wallet/redux/thunks.ts';
import { useSelector } from 'react-redux';
import { selectUserWallets } from '@app/features/wallet/redux/selectors.ts';
import { useAppToast } from '@app/components/AppToast/useAppToast.ts';

export const DepositScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<MainParamList>>();
  const { colors } = useAppTheme();
  const { showError } = useAppToast();
  const dispatch = useAppDispatch();
  const wallets = useSelector(selectUserWallets);
  const [isLoading, setIsLoading] = useState(false);

  const onChooseNetwork = useCallback(
    async (item: AssetsData) => {
      const chosenWallet = wallets?.find(el => el.cryptoAsset.id === item.id);
      if (chosenWallet) {
        navigate(MainRoute.DepositDetails, { item: chosenWallet });
      } else {
        setIsLoading(true);
        const { payload } = await dispatch(
          createUserWalletsThunk({ assetsIds: [item.id] }),
        );
        if (isThunkPayload(payload)) {
          const newWallet = payload?.find(el => el.cryptoAsset.id === item.id);
          navigate(MainRoute.DepositDetails, { item: newWallet });
        } else {
          showError(payload ?? '');
        }
        setIsLoading(false);
      }
    },
    [dispatch, navigate, showError, wallets],
  );

  const [search, setSearch] = useState('');

  return (
    <AppScreen isLoading={isLoading} title={'Deposit'} noScroll>
      <AppInput
        placeholder={'Search coins'}
        rightContent={
          !search && <AppIcon name={'Search'} color={colors.inputLabelColor} />
        }
        value={search}
        withClear={!!search}
        onChangeText={setSearch}
      />
      <CryptoCurrencyList search={search} onPress={onChooseNetwork} />
    </AppScreen>
  );
};
