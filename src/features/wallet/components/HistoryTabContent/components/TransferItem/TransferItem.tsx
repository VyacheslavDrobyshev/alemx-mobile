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

export const TransferItem: FC<{ item: TransferTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const renderedRows = useMemo(
    () => ({
      'Transaction type': capitalizeFirstLetter(item.transaction_type),
      Receiver: item.receiver_user.username,
      Date: dayjs(item.created_at).format('MMM DD, YYYY [at] HH:MM'),
    }),
    [item.created_at, item.receiver_user.username, item.transaction_type],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: <TransactionDetailsHeader item={item} />,
      title: `Transfer ${item.crypto_asset.symbol}`,
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
        name="TransferTop"
        color={colors.inputLabelColor}
      />
      <AppView flex={1}>
        <AppText textStyle="medium_14_20">
          {capitalizeFirstLetter(item.transaction_type)}
        </AppText>
        <AppText
          ellipsizeMode="middle"
          width={100}
          numberOfLines={1}
          textStyle="regular_12_18">
          <AppText color={colors.inputLabelColor}>To</AppText>{' '}
          {item.receiver_user.username || item.receiver_user.email}
        </AppText>
      </AppView>
      <AppView alignItems="flex-end">
        <AppText textStyle="medium_14_20" color={colors.negativeStatus}>
          {-item.amount} {item.crypto_asset.symbol}
        </AppText>
        <AppText textStyle="regular_12_18" color={colors.inputLabelColor}>
          =
          {formatNumber(
            item.amount_usd,
            'currency',
            2,
            item.crypto_asset.decimals,
          )}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
