import { FC, useCallback, useMemo } from 'react';
import { DepositTransaction } from '@app/features/wallet/redux/types';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { formatNumber, getDecimals } from '@app/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import dayjs from 'dayjs';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { TransactionDetailsHeader } from '@app/features/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';

export const DepositItem: FC<{ item: DepositTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const renderedRows = useMemo(
    () => ({
      'Transaction type': 'Receive',
      'Asset type': 'Crypto',
      Sender: item.externalSenderAddress,
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:MM'),
    }),
    [item.createdAt, item.externalSenderAddress],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: <TransactionDetailsHeader item={item} />,
      title: `Receive ${item.cryptoAsset.symbol}`,
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
        name="ArrowDown"
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
        <AppView flexDirection="row">
          <AppText textStyle="medium_14_20">Receive</AppText>
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
          <AppText color={colors.inputLabelColor}>From</AppText>{' '}
          <AppText color={colors.inputLabelColor}>
            {item.externalSenderAddress}
          </AppText>
        </AppText>
      </AppView>
      <AppView alignItems="flex-end">
        <AppText textStyle="medium_14_20" color={colors.positiveStatus}>
          +
          {formatNumber(
            item.amount,
            undefined,
            0,
            getDecimals(item.cryptoAsset.decimals),
          )}{' '}
          {item.cryptoAsset?.symbol}
        </AppText>
        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          =
          {formatNumber(
            item.amountUsd ?? 0,
            'currency',
            2,
            getDecimals(item.cryptoAsset.decimals),
          )}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
