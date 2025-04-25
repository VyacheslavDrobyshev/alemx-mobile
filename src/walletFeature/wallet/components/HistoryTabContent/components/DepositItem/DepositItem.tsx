import { FC, useCallback, useMemo } from 'react';
import { DepositTransaction } from '@app/walletFeature/wallet/redux/types';
import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import dayjs from 'dayjs';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { TransactionDetailsHeader } from '@app/walletFeature/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';
import { AmountValue } from '@app/walletFeature/wallet/components/AmountValue/AmountValue';

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
      <AppView width="50%">
        <AppView flexDirection="row" justifyContent="flex-end">
          <AppText textStyle="medium_14_20" color={colors.positiveStatus}>
            +
          </AppText>
          <AmountValue
            value={formatNumber(
              item.amount,
              undefined,
              2,
              item.cryptoAsset.decimals,
            )}
            Component={
              <AppText textStyle="medium_14_20" color={colors.positiveStatus} />
            }
          />
          <AppText textStyle="medium_14_20" color={colors.positiveStatus}>
            {' '}
            {item.cryptoAsset?.symbol}
          </AppText>
        </AppView>

        <AppText
          textAlign="right"
          textStyle="regular_12_18"
          color={colors.inputLabelColor}>
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
