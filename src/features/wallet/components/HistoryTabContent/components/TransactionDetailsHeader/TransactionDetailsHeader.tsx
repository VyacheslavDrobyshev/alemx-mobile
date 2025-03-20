import { AppText, AppView } from '@app/components';
import { formatNumber } from '@app/utils/number';
import { FC, useMemo } from 'react';
import { UnionTransaction } from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';
import { TransactionType } from '@app/features/wallet/screens/Wallet/constants';

export const TransactionDetailsHeader: FC<{ item: UnionTransaction }> = ({
  item,
}) => {
  const { colors } = useAppTheme();
  const amount = useMemo(() => {
    switch (item.transaction_type) {
      case TransactionType.Deposit:
        return item.amount;
      case TransactionType.Withdrawal:
        return -item.amount;
      case TransactionType.Transfer:
        return -item.amount;
      case TransactionType.Base:
        return item.amount;
      default:
        const _: never = item.transaction_type;
        return _;
    }
  }, [item.amount, item.transaction_type]);

  return (
    <AppView marginVertical={20} gap={10}>
      <AppText
        textAlign="center"
        textStyle="medium_26_32"
        color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
        {amount} {item.crypto_asset.symbol}
      </AppText>
      <AppText
        textAlign="center"
        textStyle="regular_12_18"
        color={colors.inputLabelColor}>
        =
        {formatNumber(
          item.amount_usd,
          'currency',
          2,
          item.crypto_asset.decimals,
        )}
      </AppText>
    </AppView>
  );
};
