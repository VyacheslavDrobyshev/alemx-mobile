import { FC } from 'react';
import { SwapTransaction } from '@app/features/wallet/redux/types.ts';
import { AppText, AppView } from '@app/components';

export const SwapItem: FC<{ item: SwapTransaction }> = ({ item }) => {
  return (
    <AppView>
      <AppText>{item.transaction_type}</AppText>
    </AppView>
  );
};
