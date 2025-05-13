import { FC, useCallback, useMemo } from 'react';
import { WithdrawalTransaction } from '@app/walletFeature/wallet/redux/types';
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
import dayjs from 'dayjs';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { TransactionDetailsHeader } from '@app/walletFeature/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

export const WithdrawalItem: FC<{ item: WithdrawalTransaction }> = ({
  item,
}) => {
  const { colors } = useAppTheme();

  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const networkFee = useMemo(
    () => (
      <AmountValue
        symbol={item.cryptoAsset.symbol}
        value={Number(item.networkFeeUsd)}
        Component={<AppText textStyle="medium_14_20" />}
      />
    ),
    [item.cryptoAsset.symbol, item.networkFeeUsd],
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

  const renderedRows = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transactionType),
      'Processing fee': processingFee,
      'Network Fee': networkFee,
      'Asset type': 'Crypto',
      Receiver: item.externalDestinationAddress,
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:mm'),
    }),
    [
      item.createdAt,
      item.externalDestinationAddress,
      item.transactionType,
      networkFee,
      processingFee,
    ],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: <TransactionDetailsHeader item={item} />,
      title: `Withdraw ${item.cryptoAsset.symbol}`,
      rows: renderedRows,
    });
  }, [item, navigate, renderedRows]);

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
          name="ExternalLink"
          color={colors.inputLabelColor}
        />
      </AppView>

      <AppView width="45%">
        <AppView flexDirection="row">
          <AppText textStyle="medium_14_20">
            {capitalizeFirstLetter(item.transactionType)}{' '}
          </AppText>
          <AppView
            alignSelf="center"
            marginHorizontal={5}
            height={4}
            width={4}
            borderRadius={4}
            backgroundColor={colors.inputItemColor}
          />
          <AppText textStyle="medium_14_20">Crypto</AppText>
        </AppView>

        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          textStyle="regular_12_18">
          <AppText color={colors.inputLabelColor}>To </AppText>
          <AppText color={colors.inputLabelColor}>
            {item.externalDestinationAddress}
          </AppText>
        </AppText>
      </AppView>
      <AppView width="45%" alignItems="flex-end">
        <AppView flexDirection="row">
          <AppText textStyle="medium_14_20" color={colors.negativeStatus}>
            {'- '}
          </AppText>
          <AmountValue
            value={formatNumber(
              item.amount,
              undefined,
              2,
              item.cryptoAsset.decimals,
            )}
            Component={
              <AppText textStyle="medium_14_20" color={colors.negativeStatus} />
            }
          />
          <AppText textStyle="medium_14_20" color={colors.negativeStatus}>
            {' '}
            {item.cryptoAsset.symbol}
          </AppText>
        </AppView>

        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          =
          {formatNumber(
            item.amountUsd ?? 0,
            'currency',
            2,
            item.cryptoAsset.decimals,
          )}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
