import { UnionTransaction } from '@app/walletFeature/wallet/redux/types';
import dayjs from 'dayjs';

export const groupTransactionsByDate = (
  transactionsList: UnionTransaction[],
) => {
  const grouped = transactionsList.reduce(
    (acc, transaction) => {
      const date = dayjs(transaction.createdAt).format('DD-MM-YYYY');

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);

      return acc;
    },
    {} as Record<string, UnionTransaction[]>,
  );

  return Object.keys(grouped)
    .sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
    .map(date => ({
      title: date.replaceAll('-', '.'),
      data: grouped[date],
    }));
};
