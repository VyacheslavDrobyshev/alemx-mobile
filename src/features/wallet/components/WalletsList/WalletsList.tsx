import { AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AppUserWalletsDto,
  AssetBalance,
} from '@app/features/wallet/redux/types.ts';
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
} from '@app/features/wallet/redux/selectors.ts';
import { WalletSettingsId } from '@app/features/wallet/screens/Wallet/constants.ts';
import { WalletItem } from '@app/features/wallet/components/WalletsList/components/WalletItem/WalletItem.tsx';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator.tsx';

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
}> = ({
  onPress,
  hideZeroBalance,
  hasAssets,
  isDeposit,
  withBalance,
  onPressPlaceholderButton,
}) => {
  const {
    walletList: { contentContainerStyle },
  } = useAppTheme();
  const userWallets = useSelector(selectUserWallets);
  const depositWallets = useSelector(selectDepositWallets);
  const unifiedBalance = useSelector(selectUnifiedBalance);
  const walletSettings = useSelector(selectWalletSettings);
  const isWalletsLoading = useSelector(selectIsWalletsLoading);
  const isDepositWalletsLoading = useSelector(selectIsDepositWalletsLoading);
  const isUnifiedBalanceLoading = useSelector(selectIsUnifiedBalanceLoading);

  const [mappedWallets, setMappedWallets] = useState<ModifiedWallet[]>([]);

  const wallets = useMemo(
    () => (isDeposit ? depositWallets : userWallets),
    [depositWallets, isDeposit, userWallets],
  );

  useEffect(() => {
    const modifiedWallets: ModifiedWallet[] =
      wallets?.map(el => {
        return {
          ...el,
          balancesByAsset:
            unifiedBalance?.balancesByAsset?.[el.cryptoAsset.symbol],
        };
      }) ?? [];
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
    ({ item }) => {
      return (
        <WalletItem
          hasAssets={hasAssets}
          showAssets={showAssets}
          onPress={onPress}
          item={item}
        />
      );
    },
    [hasAssets, showAssets, onPress],
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

  return (
    <AppView flex={1}>
      {isLoading ? (
        <AppActivityIndicator absoluteFill />
      ) : (
        <FlatList
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
          data={filteredWallets}
        />
      )}
    </AppView>
  );
};
