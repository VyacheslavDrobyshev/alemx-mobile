import { CryptoCurrencyList } from '@app/walletFeature/wallet/components/CryptoCurrencyList/CryptoCurrencyList';
import {
  AppIcon,
  AppInput,
  AppScreen,
} from '@app/walletFeature/wallet/common/components';
import { useCallback, useState } from 'react';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { getAssetsThunk } from '@app/walletFeature/wallet/redux/thunks';
import { paginationLimit } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { BalancesList } from '@app/walletFeature/wallet/components/BalancesList/BalancesList';

export const SwapAssetsScreen = () => {
  const [search, setSearch] = useState('');
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const {
    params: { onChooseToken, type },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.SwapAssets>>();

  useFocusEffect(
    useCallback(() => {
      void dispatch(
        getAssetsThunk({
          search,
          limit: paginationLimit,
          cursor: 1,
        }),
      );
    }, [dispatch, search]),
  );

  return (
    <AppScreen title="Select Assets" noScroll>
      {type === 'current' ? (
        <BalancesList
          title="Coin list"
          inputPlaceholder="Search coins"
          withSearch
          hideZeroBalance
          onPress={onChooseToken}
        />
      ) : (
        <>
          <AppInput
            placeholder="Search user"
            rightContent={
              !search && (
                <AppIcon name="Search" color={colors.inputLabelColor} />
              )
            }
            value={search}
            withClear={!!search}
            onChangeText={setSearch}
          />
          <CryptoCurrencyList onPress={onChooseToken} search={search} />
        </>
      )}
    </AppScreen>
  );
};
