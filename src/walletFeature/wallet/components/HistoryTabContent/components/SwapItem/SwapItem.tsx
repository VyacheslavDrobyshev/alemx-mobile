import { FC, useCallback, useMemo } from 'react';
import {
  CryptoAssetTransaction,
  SwapTransaction,
} from '@app/walletFeature/wallet/redux/types';
import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import {
  capitalizeFirstLetter,
  getStatusColor,
} from '@app/walletFeature/wallet/common/utils/common';
import {
  formatNumber,
  getDecimals,
} from '@app/walletFeature/wallet/common/utils/number';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import dayjs from 'dayjs';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';

export type SwatItemProps = {
  item: SwapTransaction;
  amount: number;
  asset: CryptoAssetTransaction;
};

export const SwapItemCoin: FC<Omit<SwatItemProps, 'item'>> = ({
  amount,
  asset,
}) => {
  const { colors } = useAppTheme();

  return (
    <AppView flexDirection="row" alignItems="center" gap={5}>
      {asset.image ? (
        <AppImage height={12} width={12} borderRadius={12} uri={asset.image} />
      ) : (
        <AppView
          height={12}
          width={12}
          borderRadius={12}
          backgroundColor={colors.buttonPrimary}
        />
      )}

      <AppText textStyle="medium_14_20">{asset.symbol}</AppText>
      <AppText color={colors.inputLabelColor} textStyle="regular_14_20">
        {formatNumber(amount, undefined, 2, getDecimals(asset.decimals))}
      </AppText>
    </AppView>
  );
};

const SwapTransactionHeader: FC<{ item: SwapTransaction }> = ({ item }) => {
  const { colors } = useAppTheme();
  return (
    <AppView alignItems="center" marginBottom={25}>
      <AppView flexDirection="row" alignItems="center">
        {item.cryptoAsset.image ? (
          <AppImage height={24} width={24} uri={item.cryptoAsset.image} />
        ) : (
          <AppView
            height={24}
            width={24}
            borderRadius={24}
            backgroundColor={colors.buttonPrimary}
          />
        )}
        <AppText marginLeft={10} textStyle="medium_26_32">
          {item.cryptoAsset.symbol}{' '}
          {formatNumber(
            item.amount,
            undefined,
            2,
            getDecimals(item.cryptoAsset.decimals),
          )}
        </AppText>
      </AppView>
      <AppView flexDirection="row" marginVertical={10}>
        <AppIcon
          marginRight={10}
          name="Switch"
          color={colors.inputLabelColor}
        />
        <AppText color={colors.inputLabelColor}>Exchange to</AppText>
      </AppView>
      <AppView flexDirection="row" alignItems="center">
        {item.toCryptoAsset.image ? (
          <AppImage height={24} width={24} uri={item.toCryptoAsset.image} />
        ) : (
          <AppView
            height={24}
            width={24}
            borderRadius={24}
            backgroundColor={colors.buttonPrimary}
          />
        )}
        <AppText marginLeft={10} textStyle="medium_26_32">
          {item.toCryptoAsset.symbol}{' '}
          {formatNumber(
            item.amount,
            undefined,
            2,
            getDecimals(item.toCryptoAsset.decimals),
          )}
        </AppText>
      </AppView>
    </AppView>
  );
};

export const SwapItem: FC<Pick<SwatItemProps, 'item'>> = ({ item }) => {
  const { colors } = useAppTheme();

  const { navigate } = useNavigation<NavigationProp<WalletParamList>>();

  const renderedRows = useMemo(
    () => ({
      'Transaction type': 'Exchange',
      Status: (
        <AppText
          color={getStatusColor(item.status, colors)}
          textStyle="medium_14_20">
          {capitalizeFirstLetter(item.status)}
        </AppText>
      ),
      Date: dayjs(item.createdAt).format('MMM DD, YYYY [at] HH:mm'),
    }),
    [colors, item.createdAt, item.status],
  );

  const onPress = useCallback(() => {
    navigate(WalletRoute.TransactionDetails, {
      header: <SwapTransactionHeader item={item} />,
      title: `Exchange ${item.cryptoAsset.symbol}`,
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
        <SwapItemCoin amount={item.amount} asset={item.cryptoAsset} />
        <SwapItemCoin amount={item.toAmount} asset={item.toCryptoAsset} />
      </AppView>
      <AppView marginLeft={10} justifyContent="center" alignItems="flex-end">
        <AppText
          color={getStatusColor(item.status, colors)}
          textStyle="medium_14_20">
          {capitalizeFirstLetter(item.status)}
        </AppText>
      </AppView>
    </AppTouchable>
  );
};
