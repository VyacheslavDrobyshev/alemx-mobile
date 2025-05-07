import { FC } from 'react';
import {
  AppScreen,
  AppText,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WalletParamList } from '@app/walletFeature/wallet/navigation/types';
import { WalletRoute } from '@app/walletFeature/wallet/navigation/constants';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
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

        <AppText textAlign="center" textStyle="medium_26_32">{`${formatNumber(
          Number(item?.totalBalanceAcrossNetworks.balance ?? 0),
          undefined,
          2,
          item.networks[0].asset.decimals,
        )} ${item.symbol}`}</AppText>
        <AppText
          color={colors.inputLabelColor}
          textStyle="regular_12_18">{`${formatNumber(
          Number(item?.totalBalanceAcrossNetworks.balanceUsd ?? 0),
          'currency',
          2,
          item.networks[0]?.asset.decimals,
        )}`}</AppText>
      </AppView>
      <AppView
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor={colors.inputBorderColor}
        paddingVertical={20}
        gap={10}>
        <NetworkItem networks={item.networks} />
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
