import { AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback, useEffect, useRef } from 'react';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { useAppTheme } from '@app/theme';

import { CryptoCurrencyItem } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/components/CryptoCurrencyItem/CryptoCurrencyItem';
import { EmptyListPlaceholder } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { useSelector } from 'react-redux';
import {
  selectAssets,
  // selectUnifiedBalance,
  // selectWalletSettings,
} from '@app/features/wallet/screens/Wallet/redux/selectors.ts';
import { useAppDispatch } from '@app/redux';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
  getUserWalletsThunk,
} from '@app/features/wallet/screens/Wallet/redux/thunks.ts';
import { paginationLimit } from '@app/features/wallet/screens/Wallet/constants.ts';
// import { WalletSettingsId } from '@app/features/wallet/screens/Wallet/constants.ts';

export const CryptoCurrencyList: FC = ({}) => {
  const {
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();

  // const unifiedBalance = useSelector(selectUnifiedBalance);
  // const walletSettings = useSelector(selectWalletSettings);
  const assets = useSelector(selectAssets);
  const cursor = useRef(1);

  useEffect(() => {
    dispatch(getUserWalletsThunk());
    dispatch(getUnifiedBalanceThunk());
    dispatch(
      getAssetsThunk({ limit: paginationLimit, cursor: cursor.current }),
    );
  }, [cursor, dispatch]);

  const onLoadMore = useCallback(() => {
    cursor.current += paginationLimit;
    dispatch(
      getAssetsThunk({ limit: paginationLimit, cursor: cursor.current }),
    );
  }, [dispatch]);

  // const wallets = useMemo(() => {
  //   const hideLessThanOne = walletSettings.find(
  //     item => item.id === WalletSettingsId.Balance,
  //   )?.isChecked;
  //
  //   // console.log(Object.values(unifiedBalance?.balancesByAsset ?? {}));
  //
  //   return Object.values(unifiedBalance?.balancesByAsset ?? {}).filter(
  //     item => !(hideLessThanOne && Number(item.balance) < 1),
  //   );
  // }, [unifiedBalance?.balancesByAsset, walletSettings]);

  const renderItem = useCallback<ListRenderItem<AssetsData>>(({ item }) => {
    return <CryptoCurrencyItem item={item} />;
  }, []);

  return (
    <AppView flex={1}>
      <FlatList
        keyExtractor={item => `${item.id}/${item.name}`}
        ListEmptyComponent={<EmptyListPlaceholder />}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={assets}
        renderItem={renderItem}
        onEndReached={onLoadMore}
      />
    </AppView>
  );
};
