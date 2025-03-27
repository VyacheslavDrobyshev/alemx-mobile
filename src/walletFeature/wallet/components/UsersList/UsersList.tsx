import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback } from 'react';
import { UserData } from '@app/walletFeature/wallet/redux/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { useSelector } from 'react-redux';
import {
  selectIsUsersLoading,
  selectNextUserCursor,
  selectUsers,
} from '@app/walletFeature/wallet/redux/selectors';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { getUsersThunk } from '@app/walletFeature/wallet/redux/thunks';
import { paginationLimit } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { EmptyListPlaceholder } from '@app/walletFeature/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder';
import { UserItem } from '@app/walletFeature/wallet/components/UsersList/components/UserItem/UserItem';
import { useFocusEffect } from '@react-navigation/native';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';

export const UsersList: FC<{
  onPress?: (item: UserData) => void;
  search?: string;
  title?: string;
}> = ({ onPress, search, title }) => {
  const {
    colors,
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const nextCursor = useSelector(selectNextUserCursor);
  const isUsersLoading = useSelector(selectIsUsersLoading);

  const onLoadMore = useCallback(() => {
    if (nextCursor) {
      void dispatch(
        getUsersThunk({
          limit: paginationLimit,
          cursor: nextCursor,
          search,
        }),
      );
    }
  }, [dispatch, nextCursor, search]);

  const renderItem = useCallback<ListRenderItem<UserData>>(
    ({ item }) => <UserItem onPress={onPress} item={item} />,
    [onPress],
  );

  useFocusEffect(
    useCallback(() => {
      void dispatch(
        getUsersThunk({
          search,
          limit: paginationLimit,
          cursor: 1,
        }),
      );
    }, [dispatch, search]),
  );

  return (
    <AppView justifyContent="center" flex={1}>
      {isUsersLoading ? (
        <AppActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={
            title && users.data.length ? (
              <AppText
                marginTop={20}
                marginBottom={10}
                color={colors.inputLabelColor}
                textStyle="regular_12_18">
                {title}
              </AppText>
            ) : null
          }
          data={users.data}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={<EmptyListPlaceholder title="No users found." />}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </AppView>
  );
};
