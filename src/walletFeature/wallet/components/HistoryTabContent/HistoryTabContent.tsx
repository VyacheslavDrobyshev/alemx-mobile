import { AppTab } from '@app/walletFeature/wallet/common/components/AppTab/AppTab';
import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { ListRenderItem, SectionList } from 'react-native';
import {
  paginationLimit,
  TransactionType,
} from '@app/walletFeature/wallet/screens/Wallet/constants';
import { DepositItem } from '@app/walletFeature/wallet/components/HistoryTabContent/components/DepositItem/DepositItem';
import {
  CryptoAssetTransaction,
  DepositTransaction,
  SwapTransaction,
  TransferTransaction,
  UnionTransaction,
  WithdrawalTransaction,
} from '@app/walletFeature/wallet/redux/types';
import { EmptyListPlaceholder } from '@app/walletFeature/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder';
import { WithdrawalItem } from '@app/walletFeature/wallet/components/HistoryTabContent/components/WithdrawalItem/WithdrawalItem';
import { TransferItem } from '@app/walletFeature/wallet/components/HistoryTabContent/components/TransferItem/TransferItem';
import { SwapItem } from '@app/walletFeature/wallet/components/HistoryTabContent/components/SwapItem/SwapItem';
import React, { FC, useCallback } from 'react';
import { getTransactionsThunk } from '@app/walletFeature/wallet/redux/thunks';
import { useAppDispatch } from '@app/walletFeature/wallet/common/redux';
import { useSelector } from 'react-redux';
import {
  selectIsTransactionsLoading,
  selectTransactionsByType,
} from '@app/walletFeature/wallet/redux/selectors';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { transactionHistoryTabs } from '@app/walletFeature/wallet/screens/WalletDetails/constants';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';
import { groupTransactionsByDate } from '@app/walletFeature/wallet/components/HistoryTabContent/components/utils';

export type HistoryTabContentProps = {
  assetSymbol?: string;
  transactionType: TransactionType;
  renderItem: ListRenderItem<UnionTransaction>;
  placeholder: string;
};

export const HistoryList: FC<HistoryTabContentProps> = ({
  assetSymbol,
  transactionType,
  renderItem,
  placeholder,
}) => {
  const {
    colors,
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const transactions = useSelector(selectTransactionsByType);
  const isTransactionsLoading = useSelector(selectIsTransactionsLoading);

  const filteredFunction = <T extends { cryptoAsset: CryptoAssetTransaction }>(
    el: T,
  ): boolean => (assetSymbol ? el.cryptoAsset.symbol === assetSymbol : true);

  const sections = groupTransactionsByDate(
    transactions[transactionType].data.filter(filteredFunction),
  );

  const onLoadMore = useCallback(() => {
    if (transactions[transactionType].next_cursor) {
      void dispatch(
        getTransactionsThunk({
          transaction_type: transactionType,
          limit: paginationLimit,
          cursor: transactions[transactionType].next_cursor.join(','),
        }),
      );
    }
  }, [dispatch, transactionType, transactions]);

  return (
    <AppView flex={1}>
      {isTransactionsLoading ? (
        <AppActivityIndicator absoluteFill />
      ) : (
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={sections}
          contentContainerStyle={contentContainerStyle}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <AppText
              color={colors.inputItemColor}
              marginBottom={5}
              marginTop={10}>
              {title}
            </AppText>
          )}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={`You have no ${placeholder} yet. All your ${placeholder} will be displayed here.`}
            />
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
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
              cursor: undefined,
              limit: paginationLimit,
            }),
          );
          break;
        case 1:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Withdrawal,
              cursor: undefined,
              limit: paginationLimit,
            }),
          );
          break;
        case 2:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Transfer,
              cursor: undefined,

              limit: paginationLimit,
            }),
          );
          break;
        case 3:
          void dispatch(
            getTransactionsThunk({
              transaction_type: TransactionType.Base,
              cursor: undefined,
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
        placeholder="deposits"
        renderItem={renderDepositItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Deposit}
      />
      <HistoryList
        placeholder="withdrawals"
        renderItem={renderWithdrawItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Withdrawal}
      />
      <HistoryList
        placeholder="transfers"
        renderItem={renderTransferItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Transfer}
      />
      <HistoryList
        placeholder="exchanges"
        renderItem={renderSwapItem}
        assetSymbol={assetSymbol}
        transactionType={TransactionType.Base}
      />
    </AppTab>
  );
};
