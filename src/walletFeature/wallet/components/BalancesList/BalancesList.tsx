import {
  AppIcon,
  AppInput,
  AppText,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  AssetBalance,
  AssetsData,
  UnifiedBalanceByNetworkDto,
} from '@app/walletFeature/wallet/redux/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { useSelector } from 'react-redux';
import {
  selectIsUnifiedBalanceByNetworkLoading,
  selectUnifiedBalanceByNetwork,
  selectWalletSettings,
} from '@app/walletFeature/wallet/redux/selectors';
import { WalletSettingsId } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { EmptyListPlaceholder } from '@app/walletFeature/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import {
  getUnifiedBalanceByNetworkThunk,
  getUnifiedBalanceThunk,
} from '@app/walletFeature/wallet/redux/thunks';
import { BalanceItem } from '@app/walletFeature/wallet/components/BalancesList/components/BalanceItem/BalanceItem';

export type WalletAssetWithBalance = AssetsData & AssetBalance;

export const BalancesList: FC<{
  onPress?: (item: UnifiedBalanceByNetworkDto) => void;
  hideZeroBalance?: boolean;
  hasAssets?: boolean;
  onPressPlaceholderButton?: () => void;
  hasRefreshControl?: boolean;
  withSearch?: boolean;
  inputPlaceholder?: string;
  title?: string;
}> = ({
  onPress,
  hideZeroBalance,
  hasAssets,
  onPressPlaceholderButton,
  hasRefreshControl,
  withSearch,
  inputPlaceholder,
  title,
}) => {
  const {
    colors,
    balanceList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const unifiedBalanceByNetwork = useSelector(selectUnifiedBalanceByNetwork);
  const walletSettings = useSelector(selectWalletSettings);
  const isUnifiedBalanceByNetworkLoading = useSelector(
    selectIsUnifiedBalanceByNetworkLoading,
  );
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');

  const hideBalance = useMemo(
    () =>
      walletSettings.find(el => el.id === WalletSettingsId.Balance)?.isChecked,
    [walletSettings],
  );

  const showAssets = useMemo(
    () =>
      walletSettings.find(el => el.id === WalletSettingsId.Assets)?.isChecked,
    [walletSettings],
  );

  const filteredWallets = useMemo(() => {
    if (hideZeroBalance) {
      if (hideBalance) {
        return unifiedBalanceByNetwork?.filter(
          el => Number(el?.totalBalanceAcrossNetworks.balanceUsd ?? 0) > 1,
        );
      }
      return unifiedBalanceByNetwork?.filter(
        el => Number(el?.totalBalanceAcrossNetworks.balanceUsd ?? 0) > 0,
      );
    }
    return unifiedBalanceByNetwork;
  }, [hideBalance, hideZeroBalance, unifiedBalanceByNetwork]);

  const renderItem = useCallback<ListRenderItem<UnifiedBalanceByNetworkDto>>(
    ({ item }) => (
      <BalanceItem
        hasAssets={hasAssets}
        showAssets={showAssets}
        onPress={onPress}
        item={item}
      />
    ),
    [hasAssets, showAssets, onPress],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void dispatch(getUnifiedBalanceThunk());
      void dispatch(getUnifiedBalanceByNetworkThunk());
      setRefreshing(false);
    }, 1000);
  }, [dispatch]);

  return (
    <AppView flex={1}>
      {isUnifiedBalanceByNetworkLoading ? (
        <AppActivityIndicator absoluteFill />
      ) : (
        <>
          {withSearch && (
            <AppInput
              placeholder={inputPlaceholder}
              rightContent={
                !search && (
                  <AppIcon name="Search" color={colors.inputLabelColor} />
                )
              }
              value={search}
              withClear={!!search}
              onChangeText={setSearch}
            />
          )}
          <FlatList
            ListHeaderComponent={
              title && unifiedBalanceByNetwork?.length ? (
                <AppText
                  marginTop={20}
                  marginBottom={10}
                  color={colors.inputLabelColor}
                  textStyle="regular_12_18">
                  {title}
                </AppText>
              ) : null
            }
            refreshControl={
              hasRefreshControl ? (
                <RefreshControl
                  tintColor={colors.inputLabelColor}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              ) : undefined
            }
            keyExtractor={item => `${item.symbol}/${item.name}`}
            ListEmptyComponent={
              <EmptyListPlaceholder
                onPressPlaceholderButton={onPressPlaceholderButton}
                title={
                  'You have no assets in your wallet.\nMake your first deposit to receive\nfunds.'
                }
              />
            }
            contentContainerStyle={contentContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            data={filteredWallets?.filter(i =>
              i.name.toLowerCase().includes(search.toLowerCase()),
            )}
          />
        </>
      )}
    </AppView>
  );
};
