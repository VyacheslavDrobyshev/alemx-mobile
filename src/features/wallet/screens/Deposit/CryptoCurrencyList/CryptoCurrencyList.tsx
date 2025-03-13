import { AppText, AppView } from '@app/components';
import { ListRenderItem, SectionList } from 'react-native';
import { FC, useCallback, useEffect } from 'react';
import { AssetsData } from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';

import { CryptoCurrencyItem } from '@app/features/wallet/screens/Deposit/CryptoCurrencyList/components/CryptoCurrencyItem/CryptoCurrencyItem';
import { useSelector } from 'react-redux';
import {
  selectAssets,
  selectNextAssetCursor,
} from '@app/features/wallet/redux/selectors';
import { useAppDispatch } from '@app/redux';
import { getAssetsThunk } from '@app/features/wallet/redux/thunks';
import { paginationLimit } from '@app/features/wallet/screens/Wallet/constants';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';

export const CryptoCurrencyList: FC<{
  onPress?: (item: AssetsData) => void;
  search?: string;
}> = ({ onPress, search }) => {
  const {
    colors,
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const assets = useSelector(selectAssets);
  const nextCursor = useSelector(selectNextAssetCursor);

  const groupByFirstLetter = useCallback(
    (items: AssetsData[]): { title: string; data: AssetsData[] }[] => {
      const grouped: Record<string, AssetsData[]> = items.reduce(
        (acc, item) => {
          const firstLetter = item.symbol[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(item);
          return acc;
        },
        {} as Record<string, AssetsData[]>,
      );

      return Object.keys(grouped)
        .sort()
        .map(letter => ({
          title: letter,
          data: grouped[letter],
        }));
    },
    [],
  );

  const sections = groupByFirstLetter(assets.data);

  const onLoadMore = useCallback(() => {
    if (nextCursor) {
      dispatch(
        getAssetsThunk({
          limit: paginationLimit,
          cursor: nextCursor,
          search,
        }),
      );
    }
  }, [dispatch, nextCursor, search]);

  const renderItem = useCallback<ListRenderItem<AssetsData>>(
    ({ item }) => {
      return <CryptoCurrencyItem onPress={onPress} item={item} />;
    },
    [onPress],
  );

  useEffect(() => {
    dispatch(
      getAssetsThunk({
        search,
        limit: paginationLimit,
        cursor: 1,
      }),
    );
  }, [dispatch, search]);

  return (
    <AppView flex={1}>
      <SectionList
        sections={sections}
        keyExtractor={item =>
          `${item.id}/${item.name}/${item.symbol}/${item.networkId}`
        }
        ListEmptyComponent={<EmptyListPlaceholder title={'No assets found.'} />}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <AppText
            marginVertical={10}
            color={colors.inputLabelColor}
            textStyle={'regular_12_18'}>
            {title}
          </AppText>
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
    </AppView>
  );
};
