import { AppTab } from '@app/components/AppTab/AppTab.tsx';
import { AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import {
  paginationLimit,
  TransactionType,
} from '@app/features/wallet/screens/Wallet/constants.ts';
import { DepositItem } from '@app/features/wallet/components/HistoryTabContent/components/DepositItem/DepositItem.tsx';
import {
  CryptoAssetTransaction,
  DepositTransaction,
  SwapTransaction,
  TransferTransaction,
  UnionTransaction,
  WithdrawalTransaction,
} from '@app/features/wallet/redux/types.ts';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { WithdrawalItem } from '@app/features/wallet/components/HistoryTabContent/components/WithdrawalItem/WithdrawalItem.tsx';
import { TransferItem } from '@app/features/wallet/components/HistoryTabContent/components/TransferItem/TransferItem.tsx';
import { SwapItem } from '@app/features/wallet/components/HistoryTabContent/components/SwapItem/SwapItem.tsx';
import React, { FC, useCallback } from 'react';
import { getTransactionsThunk } from '@app/features/wallet/redux/thunks.ts';
import { useAppDispatch } from '@app/redux';
import { useSelector } from 'react-redux';
import {
  selectIsTransactionsLoading,
  selectTransactionsByType,
} from '@app/features/wallet/redux/selectors.ts';
import { useAppTheme } from '@app/theme';
import { transactionHistoryTabs } from '@app/features/wallet/screens/WalletDetails/constants.ts';
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator.tsx';

export type HistoryTabContentProps = {
  assetSymbol?: string;
  transactionType: TransactionType;
  renderItem: ListRenderItem<UnionTransaction>;
};

export const HistoryList: FC<HistoryTabContentProps> = ({
  assetSymbol,
  transactionType,
  renderItem,
}) => {
  const {
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const transactions = useSelector(selectTransactionsByType);
  const isTransactionsLoading = useSelector(selectIsTransactionsLoading);

  const filteredFunction = <T extends { crypto_asset: CryptoAssetTransaction }>(
    el: T,
  ): boolean => {
    return assetSymbol ? el.crypto_asset.symbol === assetSymbol : true;
  };

  return (
    <AppView flex={1} justifyContent="center" alignItems="center">
      {isTransactionsLoading ? (
        <AppActivityIndicator absoluteFill />
      ) : (
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={transactions[transactionType].filter(filteredFunction)}
          renderItem={renderItem}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={
                'You have no deposits yet. All your deposits will be displayed here.'
              }
            />
          }
        />
      )}
    </AppView>
  );
};

export const HistoryTabContent: FC<
  Pick<HistoryTabContentProps, 'assetSymbol'>
> = ({ assetSymbol }) => {
  const dispatch = useAppDispatch();

  const onTabChange = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Deposit,
              cursor: 1,
              limit: paginationLimit,
            }),
          );
          break;
        case 1:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Withdrawal,
              cursor: 1,
              limit: paginationLimit,
            }),
          );
          break;
        case 2:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Transfer,
              cursor: 1,
              limit: paginationLimit,
            }),
          );
          break;
        case 3:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Base,
              cursor: 1,
              limit: paginationLimit,
            }),
          );
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  const renderDepositItem = useCallback<ListRenderItem<UnionTransaction>>(
    ({ item }) => <DepositItem item={item as DepositTransaction} />,
    [],
  );

  const renderWithdrawItem = useCallback<ListRenderItem<UnionTransaction>>(
    ({ item }) => <WithdrawalItem item={item as WithdrawalTransaction} />,
    [],
  );

  const renderTransferItem = useCallback<ListRenderItem<UnionTransaction>>(
    ({ item }) => <TransferItem item={item as TransferTransaction} />,
    [],
  );

  const renderSwapItem = useCallback<ListRenderItem<UnionTransaction>>(
    ({ item }) => <SwapItem item={item as SwapTransaction} />,
    [],
  );

  return (
    <AppTab onTabChange={onTabChange} tabs={transactionHistoryTabs}>
      <HistoryList
        renderItem={renderDepositItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Deposit}
      />
      <HistoryList
        renderItem={renderWithdrawItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Withdrawal}
      />
      <HistoryList
        renderItem={renderTransferItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Transfer}
      />
      <HistoryList
        renderItem={renderSwapItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Base}
      />
    </AppTab>
  );
};
