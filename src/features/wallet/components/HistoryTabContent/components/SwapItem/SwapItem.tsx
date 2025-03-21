import { FC } from 'react';
import { SwapTransaction } from '@app/features/wallet/redux/types';
import { AppText, AppView } from '@app/components';

export const SwapItem: FC<{ item: SwapTransaction }> = ({ item }) => (
  <AppView>
    <AppText>{item.transactionType}</AppText>
  </AppView>
);
