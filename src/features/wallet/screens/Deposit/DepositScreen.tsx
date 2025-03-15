import { FC, useCallback, useEffect, useState } from 'react';
import { AppScreen } from '@app/components';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types.ts';
import { WalletRoute } from '@app/features/wallet/navigation/constants.ts';

import { isThunkPayload, useAppDispatch } from '@app/redux';
import {
  createUserWalletsThunk,
  getDepositWalletsThunk,
} from '@app/features/wallet/redux/thunks.ts';
import { useSelector } from 'react-redux';
import { selectUserWallets } from '@app/features/wallet/redux/selectors.ts';
import { useAppToast } from '@app/components/AppToast/useAppToast.ts';
import {
  ModifiedWallet,
  WalletsList,
} from '@app/features/wallet/components/WalletsList/WalletsList.tsx';

export const DepositScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const { showError } = useAppToast();
  const dispatch = useAppDispatch();
  const wallets = useSelector(selectUserWallets);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = useCallback(
    async (item: ModifiedWallet) => {
      const chosenWallet = wallets?.find(el => el.cryptoAsset.id === item.id);
      if (chosenWallet) {
        navigate(WalletRoute.DepositDetails, { item: chosenWallet });
      } else {
        setIsLoading(true);
        const { payload } = await dispatch(
          createUserWalletsThunk({ assetsIds: [item.id] }),
        );
        if (isThunkPayload(payload)) {
          const newWallet = payload?.find(el => el.cryptoAsset.id === item.id);
          navigate(WalletRoute.DepositDetails, { item: newWallet });
        } else {
          showError(payload ?? '');
        }
        setIsLoading(false);
      }
    },
    [dispatch, navigate, showError, wallets],
  );

  useEffect(() => {
    dispatch(getDepositWalletsThunk());
  }, [dispatch]);

  return (
    <AppScreen isLoading={isLoading} title={'Deposit'} noScroll>
      <WalletsList isDeposit onPress={onPress} />
    </AppScreen>
  );
};
