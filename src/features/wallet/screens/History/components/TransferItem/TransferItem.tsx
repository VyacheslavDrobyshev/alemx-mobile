import { FC } from 'react';
import { TransferTransaction } from '@app/features/wallet/redux/types.ts';
import { AppText, AppView } from '@app/components';

export const TransferItem: FC<{ item: TransferTransaction }> = ({ item }) => {
  return (
    <AppView>
      <AppText>{item.transaction_type}</AppText>
    </AppView>
  );
};
