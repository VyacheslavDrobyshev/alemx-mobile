import { FC, useCallback, useMemo } from 'react';
import { TransferTransaction } from '@app/features/wallet/redux/types';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { capitalizeFirstLetter } from '@app/utils/common';
import { formatNumber } from '@app/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import dayjs from 'dayjs';
import { TransactionDetailsHeader } from '@app/features/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@app/features/auth/redux/selectors';

export const TransferItem: FC<{ item: TransferTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const userInfo = useSelector(selectUserInfo);

  const renderedRows = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transactionType),
      Receiver: item.receiverUser.username,
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:MM'),
    }),
    [item.createdAt, item.receiverUser.username, item.transactionType],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: <TransactionDetailsHeader item={item} />,
      title: `Transfer ${item.cryptoAsset.symbol}`,
      rows: renderedRows,
    });
  }, [item, navigate, renderedRows]);

  const amount = useMemo(
    () => (item.receiverUser.id === userInfo?.id ? item.amount : -item.amount),
    [item.amount, item.receiverUser.id, userInfo?.id],
  );

  return (
    <AppTouchable
      onPress={onPress}
      backgroundColor={colors.primaryLightColor}
      height={64}
      flex={1}
      marginBottom={10}
      padding={10}
      borderRadius={8}
      borderWidth={1}
      flexDirection="row"
      alignItems="center"
      borderColor={colors.inputBorderColor}>
      <AppIcon
        marginRight={10}
        name="TransferTop"
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
        <AppText textStyle="medium_14_20">
          {capitalizeFirstLetter(item.transactionType)}
        </AppText>
        <AppText
          ellipsizeMode="middle"
          width={100}
          numberOfLines={1}
          textStyle="regular_12_18">
          <AppText color={colors.inputLabelColor}>To</AppText>{' '}
          {item.receiverUser.username || item.receiverUser.email}
        </AppText>
      </AppView>
      <AppView width="50%" alignItems="flex-end">
        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          textStyle="medium_14_20"
          color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
          {`${amount > 0 ? '+' : ''}${formatNumber(
            amount,
            undefined,
            0,
            item.cryptoAsset.decimals,
          )} `}
          {item.cryptoAsset.symbol}
        </AppText>
        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          =
          {formatNumber(
            item.amountUsd,
            'currency',
            2,
            item.cryptoAsset.decimals,
          )}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
