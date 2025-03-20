import { AppIcon, AppInput, AppView } from '@app/components';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppUserWalletsDto,
  AssetBalance,
} from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';
import { useSelector } from 'react-redux';
import {
  selectDepositWallets,
  selectIsDepositWalletsLoading,
  selectIsUnifiedBalanceLoading,
  selectIsWalletsLoading,
  selectUnifiedBalance,
  selectUserWallets,
  selectWalletSettings,
} from '@app/features/wallet/redux/selectors';
import { WalletSettingsId } from '@app/features/wallet/screens/Wallet/constants';
import { WalletItem } from '@app/features/wallet/components/WalletsList/components/WalletItem/WalletItem';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder';
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator';
import { useAppDispatch } from '@app/redux';
import { getUnifiedBalanceThunk } from '@app/features/wallet/redux/thunks';

export type ModifiedWallet = AppUserWalletsDto & {
  balancesByAsset?: AssetBalance;
};

export const WalletsList: FC<{
  onPress?: (item: ModifiedWallet) => void;
  hideZeroBalance?: boolean;
  hasAssets?: boolean;
  isDeposit?: boolean;
  withBalance?: boolean;
  onPressPlaceholderButton?: () => void;
  showNetwork?: boolean;
  hasRefreshControl?: boolean;
  withSearch?: boolean;
  inputPlaceholder?: string;
}> = ({
  onPress,
  hideZeroBalance,
  hasAssets,
  isDeposit,
  withBalance,
  onPressPlaceholderButton,
  showNetwork,
  hasRefreshControl,
  withSearch,
  inputPlaceholder,
}) => {
  const {
    colors,
    walletList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const userWallets = useSelector(selectUserWallets);
  const depositWallets = useSelector(selectDepositWallets);
  const unifiedBalance = useSelector(selectUnifiedBalance);
  const walletSettings = useSelector(selectWalletSettings);
  const isWalletsLoading = useSelector(selectIsWalletsLoading);
  const isDepositWalletsLoading = useSelector(selectIsDepositWalletsLoading);
  const isUnifiedBalanceLoading = useSelector(selectIsUnifiedBalanceLoading);
  const [refreshing, setRefreshing] = useState(false);

  const [mappedWallets, setMappedWallets] = useState<ModifiedWallet[]>([]);
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState<ModifiedWallet[]>([]);

  const wallets = useMemo(
    () => (isDeposit ? depositWallets : userWallets),
    [depositWallets, isDeposit, userWallets],
  );

  useEffect(() => {
    const modifiedWallets: ModifiedWallet[] =
      wallets?.map(el => ({
        ...el,
        balancesByAsset:
          unifiedBalance?.balancesByAsset?.[el.cryptoAsset.symbol],
      })) ?? [];
    setMappedWallets(modifiedWallets);
  }, [unifiedBalance?.balancesByAsset, wallets]);

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
        return mappedWallets.filter(
          el => Number(el.balancesByAsset?.balanceUsd ?? 0) > 1,
        );
      }
      return mappedWallets.filter(
        el => Number(el.balancesByAsset?.balanceUsd ?? 0) > 0,
      );
    }
    return mappedWallets;
  }, [hideBalance, hideZeroBalance, mappedWallets]);

  const renderItem = useCallback<ListRenderItem<ModifiedWallet>>(
    ({ item }) => (
      <WalletItem
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

  useEffect(() => {
    if (search) {
      setCoins(
        filteredWallets.filter(
          el =>
            el.cryptoAsset.name.toLowerCase().includes(search.toLowerCase()) ||
            el.cryptoAsset.symbol.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setCoins(filteredWallets);
    }
  }, [filteredWallets, search]);

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
              `${item.id}/${item.cryptoAsset.name}/${item.cryptoAsset.symbol}/${item.cryptoAsset.networkId}`
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
            data={coins}
          />
        </>
      )}
    </AppView>
  );
};
