import { UnionTransaction } from '@app/features/wallet/redux/types';
import dayjs from 'dayjs';

export const groupTransactionsByDate = (
  transactionsList: UnionTransaction[],
) => {
  const grouped = transactionsList.reduce(
    (acc, transaction) => {
      const date = dayjs(transaction.created_at).format('DD.MM.YYYY');

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);

      return acc;
    },
    {} as Record<string, UnionTransaction[]>,
  );

  return Object.keys(grouped).map((date) => ({
    title: date,
    data: grouped[date],
  }));
};
