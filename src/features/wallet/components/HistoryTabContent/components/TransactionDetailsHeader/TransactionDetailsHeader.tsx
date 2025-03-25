import { AppText, AppView } from '@app/components';
import { formatNumber, getDecimals } from '@app/utils/number';
import { FC, useMemo } from 'react';
import {
  TransferTransaction,
  UnionTransaction,
} from '@app/features/wallet/redux/types';
import { useAppTheme } from '@app/theme';
import { TransactionType } from '@app/features/wallet/screens/Wallet/constants';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@app/features/auth/redux/selectors';

export const TransactionDetailsHeader: FC<{ item: UnionTransaction }> = ({
  item,
}) => {
  const userInfo = useSelector(selectUserInfo);
  const { colors } = useAppTheme();
  const amount = useMemo(() => {
    switch (item.transactionType) {
      case TransactionType.Deposit:
        return item.amount;
      case TransactionType.Withdrawal:
        return -item.amount;
      case TransactionType.Transfer:
        return userInfo?.id === (item as TransferTransaction).receiverUser.id
          ? item.amount
          : -item.amount;
      case TransactionType.Base:
        return item.amount;
      default:
        const _: never = item.transactionType;
        return _;
    }
  }, [item, userInfo?.id]);

  return (
    <AppView marginVertical={20} gap={10}>
      <AppText
        textAlign="center"
        textStyle="medium_26_32"
        color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
        {`${amount > 0 ? '+' : ''}${formatNumber(
          amount,
          undefined,
          0,
          getDecimals(item.cryptoAsset.decimals),
        )} `}
        {item.cryptoAsset.symbol}
      </AppText>
      <AppText
        textAlign="center"
        textStyle="regular_12_18"
        color={colors.inputLabelColor}>
        =
        {formatNumber(
          item.amountUsd,
          'currency',
          2,
          getDecimals(item.cryptoAsset.decimals),
        )}
      </AppText>
    </AppView>
  );
};
