import { FC } from 'react';
import { DepositTransaction } from '@app/features/wallet/redux/types.ts';
import { AppText, AppView } from '@app/components';

export const DepositItem: FC<{ item: DepositTransaction }> = ({ item }) => {
  return (
    <AppView>
      <AppText>{item.transaction_type}</AppText>
    </AppView>
  );
};
