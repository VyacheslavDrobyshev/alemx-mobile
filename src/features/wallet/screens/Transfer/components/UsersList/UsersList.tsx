import { AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback, useEffect } from 'react';
import { UserData } from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';

import { useSelector } from 'react-redux';
import {
  selectNextUserCursor,
  selectUsers,
} from '@app/features/wallet/redux/selectors';
import { useAppDispatch } from '@app/redux';
import { getUsersThunk } from '@app/features/wallet/redux/thunks';
import { paginationLimit } from '@app/features/wallet/screens/Wallet/constants';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { UserItem } from '@app/features/wallet/screens/Transfer/components/UsersList/components/UserItem/UserItem.tsx';

export const UsersList: FC<{
  onPress?: (item: UserData) => void;
  search?: string;
}> = ({ onPress, search }) => {
  const {
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const nextCursor = useSelector(selectNextUserCursor);

  const onLoadMore = useCallback(() => {
    if (nextCursor) {
      dispatch(
        getUsersThunk({
          limit: paginationLimit,
          cursor: nextCursor,
          search,
        }),
      );
    }
  }, [dispatch, nextCursor, search]);

  const renderItem = useCallback<ListRenderItem<UserData>>(
    ({ item }) => {
      return <UserItem onPress={onPress} item={item} />;
    },
    [onPress],
  );

  useEffect(() => {
    dispatch(
      getUsersThunk({
        search,
        limit: paginationLimit,
        cursor: 1,
      }),
    );
  }, [dispatch, search]);

  return (
    <AppView flex={1}>
      <FlatList
        data={users.data}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={<EmptyListPlaceholder title={'No users found.'} />}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
    </AppView>
  );
};
