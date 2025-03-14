import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { FC, useCallback } from 'react';
import { useAppTheme } from '@app/theme';
import { useAppDispatch } from '@app/redux';
import {
  paginationLimit,
  TransactionType,
} from '@app/features/wallet/screens/Wallet/constants.ts';
import { WithdrawalItem } from '@app/features/wallet/screens/History/components/WithdrawalItem/WithdrawalItem.tsx';
import { TransferItem } from '@app/features/wallet/screens/History/components/TransferItem/TransferItem.tsx';
import { SwapItem } from '@app/features/wallet/screens/History/components/SwapItem/SwapItem.tsx';
import { DepositItem } from '@app/features/wallet/screens/History/components/DepositItem/DepositItem.tsx';
import {
  DepositTransaction,
  SwapTransaction,
  TransferTransaction,
  WithdrawalTransaction,
} from '@app/features/wallet/redux/types.ts';
import { getTransactionsThunk } from '@app/features/wallet/redux/thunks.ts';
import { selectTransactionsByType } from '@app/features/wallet/redux/selectors.ts';
import { EmptyListPlaceholder } from '@app/features/wallet/components/EmptyListPlaceholder/EmptyListPlaceholder.tsx';
import { AppTab } from '@app/components/AppTab/AppTab';
import { AppScreen, AppView } from '@app/components';

const tabs = ['Deposit', 'Withdraw', 'Transfer', 'Exchange'];

export const HistoryScreen: FC = () => {
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

  return (
    <AppScreen title={'History'} noScroll>
      <AppTab onTabChange={onTabChange} tabs={tabs}>
        <AppView flex={1} justifyContent="center" alignItems="center">
          <FlatList
            contentContainerStyle={contentContainerStyle}
            data={transactions[TransactionType.Deposit]}
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
            data={transactions[TransactionType.Withdrawal]}
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
            data={transactions[TransactionType.Transfer]}
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
            data={transactions[TransactionType.Base]}
            renderItem={({ item }) => (
              <SwapItem item={item as SwapTransaction} />
            )}
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
    </AppScreen>
  );
};
