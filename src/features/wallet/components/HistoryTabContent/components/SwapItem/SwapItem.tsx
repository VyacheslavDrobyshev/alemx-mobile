import { FC, useCallback, useMemo } from 'react';
import { SwapTransaction } from '@app/features/wallet/redux/types';
import { AppIcon, AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { capitalizeFirstLetter } from '@app/utils/common';
import { formatNumber } from '@app/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/features/wallet/navigation/types';
import dayjs from 'dayjs';
import { WalletRoute } from '@app/features/wallet/navigation/constants';
import { TransactionDetailsHeader } from '@app/features/wallet/components/HistoryTabContent/components/TransactionDetailsHeader/TransactionDetailsHeader';

export type SwatItemProps = {
  item: SwapTransaction;
};
// todo finish when swap will be implemented
export const SwapItemCoin: FC<SwatItemProps> = ({ item }) => {
  const { colors } = useAppTheme();

  return (
    <AppView flexDirection="row" alignItems="center" gap={5}>
      <AppView
        height={12}
        width={12}
        borderRadius={12}
        backgroundColor={colors.buttonPrimary}
      />
      <AppText textStyle="medium_14_20">USDC</AppText>
      <AppText color={colors.inputLabelColor} textStyle="regular_14_20">
        {formatNumber(4353.3453, 'currency', 0, item.cryptoAsset.decimals ?? 0)}
      </AppText>
    </AppView>
  );
};

export const SwapItem: FC<SwatItemProps> = ({ item }) => {
  const { colors } = useAppTheme();

  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const renderedRows = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transactionType),
      'Asset type': 'Crypto',
      Receiver: 'item.externalDestinationAddress',
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:MM'),
    }),
    [item.createdAt, item.transactionType],
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
      <AppIcon marginRight={10} name="Switch" color={colors.inputLabelColor} />
      <AppView justifyContent="space-between" flex={1}>
        <SwapItemCoin item={item} />
        <SwapItemCoin item={item} />
      </AppView>
      <AppView marginLeft={10} justifyContent="center" alignItems="flex-end">
        <AppText color={colors.successToastIcon} textStyle="medium_14_20">
          Success
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
