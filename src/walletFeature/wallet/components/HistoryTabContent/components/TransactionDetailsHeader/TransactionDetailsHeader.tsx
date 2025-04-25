import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { FC, useMemo } from 'react';
import {
  TransferTransaction,
  UnionTransaction,
} from '@app/walletFeature/wallet/redux/types';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { TransactionType } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@app/walletFeature/wallet/redux/selectors';

export const TransactionDetailsHeader: FC<{
  item: UnionTransaction;
  commission?: string;
  commissionInUsd?: number;
  isReceiver?: boolean;
}> = ({ item, commission, commissionInUsd, isReceiver }) => {
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
          ? Number(item.amount)
          : -(Number(item.amount) + Number(commission));
      case TransactionType.Base:
        return item.amount;
      default:
        const _: never = item.transactionType;
        return _;
    }
  }, [commission, item, userInfo?.id]);

  return (
    <AppView alignItems="center" marginVertical={20} gap={10}>
      <AppText
        maxWidth="75%"
        textAlign="center"
        textStyle="medium_26_32"
        color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
        {`${amount > 0 ? '+' : ''}${formatNumber(
          amount,
          undefined,
          2,
          item.cryptoAsset.decimals,
        )} `}
        {item.cryptoAsset.symbol}
      </AppText>
      <AppText
        textAlign="center"
        textStyle="regular_12_18"
        color={colors.inputLabelColor}>
        =
        {formatNumber(
          isReceiver
            ? Number(item.amountUsd)
            : Number(item.amountUsd) + Number(commissionInUsd ?? 0),
          'currency',
          2,
          item.cryptoAsset.decimals,
        )}
      </AppText>
    </AppView>
  );
};
