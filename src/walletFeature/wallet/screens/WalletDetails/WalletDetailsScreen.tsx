import { FC } from 'react';
import { AppScreen, AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { formatNumber, getDecimals } from '@app/walletFeature/wallet/common/utils/number';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { NetworkItem } from '@app/walletFeature/wallet/screens/WalletDetails/components/NetworkItem/NetworkItem';
import { HistoryTabContent } from '@app/walletFeature/wallet/components/HistoryTabContent/HistoryTabContent';

export const WalletDetailsScreen: FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<WalletParamList, WalletRoute.WalletDetails>>();

  const { colors } = useAppTheme();

  return (
    <AppScreen noScroll title={item.symbol}>
      <AppView
        height={100}
        marginVertical={20}
        alignItems="center"
        justifyContent="space-between">
        {item.image ? (
          <AppImage width={30} height={30} uri={item.image} />
        ) : (
          <AppView
            alignItems="center"
            justifyContent="center"
            height={30}
            width={30}
            borderRadius={30}
            backgroundColor={colors.buttonPrimary}>
            <AppText textStyle="medium_14_20">{item.name.slice(0, 2)}</AppText>
          </AppView>
        )}

        <AppText textStyle="medium_26_32">{`${formatNumber(
          Number(item?.balance ?? 0),
          undefined,
          2,
          getDecimals(item.decimals),
        )} ${item.symbol}`}</AppText>
        <AppText
          color={colors.inputLabelColor}
          textStyle="regular_12_18">{`${formatNumber(
          Number(item?.balanceUsd ?? 0),
          'currency',
          2,
          getDecimals(item.decimals),
        )}`}</AppText>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor={colors.inputBorderColor}
        paddingVertical={20}
        gap={10}>
        <NetworkItem item={item} />
      </AppView>
      <AppView flex={1}>
        <AppText marginTop={10} textStyle="medium_16_24">
          Transaction history
        </AppText>
        <HistoryTabContent assetSymbol={item.symbol} />
      </AppView>
    </AppScreen>
  );
};
