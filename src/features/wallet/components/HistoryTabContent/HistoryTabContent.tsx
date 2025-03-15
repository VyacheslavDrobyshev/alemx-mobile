import { AppTab } from '@app/components/AppTab/AppTab.tsx';
import { AppView } from '@app/components';
import { FlatList } from 'react-native';
import {
  paginationLimit,
  TransactionType,
} from '@app/features/wallet/screens/Wallet/constants.ts';
import { DepositItem } from '@app/features/wallet/screens/History/components/DepositItem/DepositItem.tsx';
import {
  CryptoAssetTransaction,
  DepositTransaction,
  SwapTransaction,
  TransferTransaction,
  WithdrawalTransaction,
} from '@app/features/wallet/redux/types.ts';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { WithdrawalItem } from '@app/features/wallet/screens/History/components/WithdrawalItem/WithdrawalItem.tsx';
import { TransferItem } from '@app/features/wallet/screens/History/components/TransferItem/TransferItem.tsx';
import { SwapItem } from '@app/features/wallet/screens/History/components/SwapItem/SwapItem.tsx';
import { FC, useCallback } from 'react';
import { getTransactionsThunk } from '@app/features/wallet/redux/thunks.ts';
import { useAppDispatch } from '@app/redux';
import { useSelector } from 'react-redux';
import { selectTransactionsByType } from '@app/features/wallet/redux/selectors.ts';
import { useAppTheme } from '@app/theme';
import { transactionHistoryTabs } from '@app/features/wallet/screens/WalletDetails/constants.ts';

export const HistoryTabContent: FC<{ assetSymbol?: string }> = ({
  assetSymbol,
}) => {
  const dispatch = useAppDispatch();
  const transactions = useSelector(selectTransactionsByType);
  const {
    cryptoCurrencyList: { contentContainerStyle },
  } = useAppTheme();

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

  const filteredFunction = <T extends { crypto_asset: CryptoAssetTransaction }>(
    el: T,
  ): boolean => {
    return assetSymbol ? el.crypto_asset.symbol === assetSymbol : true;
  };

  return (
    <AppTab onTabChange={onTabChange} tabs={transactionHistoryTabs}>
      <AppView flex={1} justifyContent="center" alignItems="center">
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={transactions[TransactionType.Deposit].filter(filteredFunction)}
          renderItem={({ item }) => (
            <DepositItem item={item as DepositTransaction} />
          )}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={
                'You have no deposits yet. All your deposits will be displayed here.'
              }
            />
          }
        />
      </AppView>
      <AppView flex={1} justifyContent="center" alignItems="center">
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={transactions[TransactionType.Withdrawal].filter(
            filteredFunction,
          )}
          renderItem={({ item }) => (
            <WithdrawalItem item={item as WithdrawalTransaction} />
          )}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={
                'You have no withdrawals yet. All your withdrawals will be displayed here.'
              }
            />
          }
        />
      </AppView>
      <AppView flex={1} justifyContent="center" alignItems="center">
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={transactions[TransactionType.Transfer].filter(filteredFunction)}
          renderItem={({ item }) => (
            <TransferItem item={item as TransferTransaction} />
          )}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={
                'You have no transfers yet. All your transfers will be displayed here.'
              }
            />
          }
        />
      </AppView>
      <AppView flex={1} justifyContent="center" alignItems="center">
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={transactions[TransactionType.Base].filter(filteredFunction)}
          renderItem={({ item }) => <SwapItem item={item as SwapTransaction} />}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={
                'You have no exchanges yet. All your exchanges will be displayed here.'
              }
            />
          }
        />
      </AppView>
    </AppTab>
  );
};
