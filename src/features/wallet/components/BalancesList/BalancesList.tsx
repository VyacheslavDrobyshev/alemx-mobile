import { AppIcon, AppInput, AppText, AppView } from '@app/components';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppAssetsDto,
  AssetBalance,
  AssetsData,
} from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';
import { useSelector } from 'react-redux';
import {
  selectIsDepositWalletsLoading,
  selectIsUnifiedBalanceLoading,
  selectIsWalletsLoading,
  selectUnifiedBalance,
  selectWalletSettings,
} from '@app/features/wallet/redux/selectors';
import { WalletSettingsId } from '@app/features/wallet/screens/Wallet/constants';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder';
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator';
import { useAppDispatch } from '@app/redux';
import {
  getAssetsThunk,
  getUnifiedBalanceThunk,
} from '@app/features/wallet/redux/thunks';
import { BalanceItem } from '@app/features/wallet/components/BalancesList/components/BalanceItem/BalanceItem';

export type WalletAssetWithBalance = AssetsData & AssetBalance;

export const BalancesList: FC<{
  onPress?: (item: WalletAssetWithBalance) => void;
  hideZeroBalance?: boolean;
  hasAssets?: boolean;
  withBalance?: boolean;
  onPressPlaceholderButton?: () => void;
  showNetwork?: boolean;
  hasRefreshControl?: boolean;
  withSearch?: boolean;
  inputPlaceholder?: string;
  title?: string;
}> = ({
  onPress,
  hideZeroBalance,
  hasAssets,
  withBalance,
  onPressPlaceholderButton,
  showNetwork,
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
  const unifiedBalance = useSelector(selectUnifiedBalance);
  const walletSettings = useSelector(selectWalletSettings);
  const isWalletsLoading = useSelector(selectIsWalletsLoading);
  const isDepositWalletsLoading = useSelector(selectIsDepositWalletsLoading);
  const isUnifiedBalanceLoading = useSelector(selectIsUnifiedBalanceLoading);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState<WalletAssetWithBalance[]>([]);

  useEffect(() => {
    void (async () => {
      if (unifiedBalance) {
        const keys = Object.keys(unifiedBalance?.balancesByAsset ?? {});
        const normalizedList = await Promise.all(
          keys.map(async element => {
            const { payload } = await dispatch(
              getAssetsThunk({ limit: 100, cursor: 1, search: element }),
            );
            const { data } = payload as AppAssetsDto;
            return data.length === 1
              ? { ...data[0], ...unifiedBalance?.balancesByAsset[element] }
              : {
                  ...(data.find(el => el.externalId === element) ||
                    ({} as AssetsData)),
                  ...unifiedBalance?.balancesByAsset[element],
                };
          }),
        );

        setCoins(normalizedList);
      }
    })();
  }, [dispatch, unifiedBalance, unifiedBalance?.balancesByAsset]);

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
        return coins.filter(el => Number(el?.balanceUsd ?? 0) > 1);
      }
      return coins.filter(el => Number(el?.balanceUsd ?? 0) > 0);
    }
    return coins;
  }, [hideBalance, hideZeroBalance, coins]);

  const renderItem = useCallback<ListRenderItem<WalletAssetWithBalance>>(
    ({ item }) => (
      <BalanceItem
        hasAssets={hasAssets}
        showAssets={showAssets}
        showNetwork={showNetwork}
        onPress={onPress}
        item={item}
      />
    ),
    [hasAssets, showAssets, showNetwork, onPress],
  );

  const isLoading = useMemo(
    () =>
      withBalance
        ? isWalletsLoading || isUnifiedBalanceLoading
        : isDepositWalletsLoading,
    [
      isDepositWalletsLoading,
      isUnifiedBalanceLoading,
      withBalance,
      isWalletsLoading,
    ],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void dispatch(getUnifiedBalanceThunk());
      setRefreshing(false);
    }, 1000);
  }, [dispatch]);

  return (
    <AppView flex={1}>
      {isLoading ? (
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
              title && coins.length ? (
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
            keyExtractor={item =>
              `${item.id}/${item.name}/${item.symbol}/${item.networkId}`
            }
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
            data={filteredWallets}
          />
        </>
      )}
    </AppView>
  );
};
