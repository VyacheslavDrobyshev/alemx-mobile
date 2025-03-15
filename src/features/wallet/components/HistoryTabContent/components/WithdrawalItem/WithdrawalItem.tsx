import { FC } from 'react';
import { WithdrawalTransaction } from '@app/features/wallet/redux/types.ts';
import { AppText, AppView } from '@app/components';

export const WithdrawalItem: FC<{ item: WithdrawalTransaction }> = ({
  item,
}) => {
  return (
    <AppView>
      <AppText>{item.transaction_type}</AppText>
    </AppView>
  );
};
