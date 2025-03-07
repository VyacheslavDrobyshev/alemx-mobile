import { AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback, useMemo } from 'react';
import { AssetBalance } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { useAppTheme } from '@app/theme';

import { CryptoCurrencyItem } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/components/CryptoCurrencyItem/CryptoCurrencyItem';
import { EmptyListPlaceholder } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { useSelector } from 'react-redux';
import { selectUnifiedBalance } from '@app/features/wallet/screens/Wallet/redux/selectors.ts';

export const CryptoCurrencyList: FC = ({}) => {
  const {
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();

  const unifiedBalance = useSelector(selectUnifiedBalance);

  const wallets = useMemo(
    () => Object.values(unifiedBalance?.balancesByAsset ?? {}),
    [unifiedBalance?.balancesByAsset],
  );

  const renderItem = useCallback<ListRenderItem<AssetBalance>>(({ item }) => {
    return <CryptoCurrencyItem item={item} />;
  }, []);

  return (
    <AppView flex={1}>
      <FlatList
        ListEmptyComponent={<EmptyListPlaceholder />}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={wallets}
        renderItem={renderItem}
      />
    </AppView>
  );
};
