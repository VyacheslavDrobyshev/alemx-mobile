import { FC, useCallback, useMemo } from 'react';
import { WithdrawalTransaction } from '@app/walletFeature/wallet/redux/types';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { capitalizeFirstLetter } from '@app/walletFeature/wallet/common/utils/common';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import dayjs from 'dayjs';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { TransactionDetailsHeader } from '@app/walletFeature/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';

export const WithdrawalItem: FC<{ item: WithdrawalTransaction }> = ({
  item,
}) => {
  const { colors } = useAppTheme();

  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const renderedRows = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transactionType),
      'Asset type': 'Crypto',
      Receiver: item.externalDestinationAddress,
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:MM'),
    }),
    [item.createdAt, item.externalDestinationAddress, item.transactionType],
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
      <AppIcon
        marginRight={10}
        name="ExternalLink"
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
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
          width={100}
          numberOfLines={1}
          textStyle="regular_12_18">
          <AppText color={colors.inputLabelColor}>To </AppText>
          <AppText color={colors.inputLabelColor}>
            {item.externalDestinationAddress}
          </AppText>
        </AppText>
      </AppView>
      <AppView width="50%" alignItems="flex-end">
        <AppText
          ellipsizeMode="middle"
          numberOfLines={1}
          textStyle="medium_14_20"
          color={colors.negativeStatus}>
          -{formatNumber(item.amount, undefined, 0, item.cryptoAsset.decimals)}{' '}
          {item.cryptoAsset.symbol}
        </AppText>
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
