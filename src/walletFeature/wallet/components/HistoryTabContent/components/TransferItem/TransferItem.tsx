import React, { FC, useCallback, useMemo } from 'react';
import { TransferTransaction } from '@app/walletFeature/wallet/redux/types';
import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { capitalizeFirstLetter } from '@app/walletFeature/wallet/common/utils/common';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import dayjs from 'dayjs';
import { TransactionDetailsHeader } from '@app/walletFeature/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@app/walletFeature/wallet/redux/selectors';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

export const TransferItem: FC<{ item: TransferTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();
  const userInfo = useSelector(selectUserInfo);

  const isReceiver = useMemo(
    () => item.receiverUser.id === userInfo?.id,
    [item.receiverUser.id, userInfo?.id],
  );

  const processingFee = useMemo(
    () => (
      <AmountValue
        symbol={item.cryptoAsset.symbol}
        value={Number(item.commissionTotalAmount)}
        Component={<AppText textStyle="medium_14_20" />}
      />
    ),
    [item.commissionTotalAmount, item.cryptoAsset.symbol],
  );

  const renderedRows: { [key: string]: string | React.ReactNode } = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transactionType),
      'Processing fee': processingFee,
      Receiver: item.receiverUser.username,
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:mm'),
    }),
    [
      item.createdAt,
      item.receiverUser.username,
      item.transactionType,
      processingFee,
    ],
  );

  if (isReceiver) {
    delete renderedRows['Processing fee'];
  }

  const commission = useMemo(
    () =>
      item.commissionTotalAmount ??
      item.commissions.reduce(
        (acc, el) => acc + Number(el.commissionAmount),
        0,
      ),
    [item.commissionTotalAmount, item.commissions],
  );

  const commissionInUsd = useMemo(
    () =>
      item.commissions.reduce(
        (acc, el) =>
          (Number(el.commissionType.commissionPercentage) / 100) * item.amount +
          acc,
        0,
      ),
    [item.amount, item.commissions],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: (
        <TransactionDetailsHeader
          item={item}
          commission={commission}
          commissionInUsd={commissionInUsd}
          isReceiver={isReceiver}
        />
      ),
      title: `Transfer ${item.cryptoAsset.symbol}`,
      rows: renderedRows,
    });
  }, [commission, commissionInUsd, isReceiver, item, navigate, renderedRows]);

  const amount = useMemo(
    () =>
      isReceiver
        ? Number(item.amount) - Number(commission)
        : -Number(item.amount),
    [commission, item.amount, isReceiver],
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
      <AppView width="10%">
        <AppIcon
          marginRight={10}
          name="TransferTop"
          color={colors.inputLabelColor}
        />
      </AppView>

      <AppView width="45%">
        <AppText textStyle="medium_14_20">
          {capitalizeFirstLetter(item.transactionType)}
        </AppText>
        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          textStyle="regular_12_18">
          <AppText color={colors.inputLabelColor}>To</AppText>{' '}
          {item.receiverUser.username || item.receiverUser.email}
        </AppText>
      </AppView>
      <AppView width="45%" alignItems="flex-end">
        <AppView flexDirection="row">
          <AppText
            textStyle="medium_14_20"
            color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
            {`${amount > 0 ? '+' : ''}`}
          </AppText>
          <AmountValue
            value={amount}
            Component={
              <AppText
                ellipsizeMode="middle"
                numberOfLines={1}
                textStyle="medium_14_20"
                color={
                  amount > 0 ? colors.positiveStatus : colors.negativeStatus
                }
              />
            }
          />
          <AppText
            textStyle="medium_14_20"
            color={amount > 0 ? colors.positiveStatus : colors.negativeStatus}>
            {' '}
            {item.cryptoAsset.symbol}
          </AppText>
        </AppView>
        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          =
          {formatNumber(
            isReceiver
              ? Number(item.amountUsd) - commissionInUsd
              : Number(item.amountUsd),
            'currency',
            2,
            item.cryptoAsset.decimals,
          )}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
