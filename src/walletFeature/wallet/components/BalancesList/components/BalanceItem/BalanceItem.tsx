import {
  AppText,
  AppTouchable,
  AppView,
} from '@app/walletFeature/wallet/common/components';
import { FC } from 'react';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import {
  formatNumber,
  getDecimals,
} from '@app/walletFeature/wallet/common/utils/number';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { NetworkItem } from '@app/walletFeature/wallet/screens/WalletDetails/components/NetworkItem/NetworkItem';
import { UnifiedBalanceByNetworkDto } from '@app/walletFeature/wallet/redux/types';

export const BalanceItem: FC<{
  item: UnifiedBalanceByNetworkDto;
  onPress?: (item: UnifiedBalanceByNetworkDto) => void;
  showAssets?: boolean;
  hasAssets?: boolean;
}> = ({ item, onPress, showAssets = false, hasAssets }) => {
  const {
    colors,
    cryptoCurrencyList: { secondaryTextColor, itemContainer, icon },
  } = useAppTheme();

  return (
    <AppView
      borderWidth={itemContainer.borderWidth}
      borderColor={itemContainer.borderColor}
      borderRadius={itemContainer.borderRadius}
      marginBottom={itemContainer.marginBottom}
      backgroundColor={colors.primaryLightColor}
      paddingVertical={itemContainer.paddingVertical}
      paddingHorizontal={itemContainer.paddingHorizontal}>
      <AppTouchable
        onPress={() => onPress?.(item)}
        flexDirection="row"
        alignItems="center">
        {item.image ? (
          <AppView>
            <AppImage
              uri={item.image}
              height={icon.height}
              width={icon.width}
              marginRight={icon.marginRight}
            />
          </AppView>
        ) : (
          <AppView
            alignItems="center"
            justifyContent="center"
            height={icon.height}
            width={icon.width}
            borderRadius={icon.borderRadius}
            backgroundColor={colors.buttonPrimary}
            marginRight={icon.marginRight}>
            <AppText textStyle="semi_bold_12_18">
              {item.symbol.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppView justifyContent="space-between" flexDirection="row" flex={1}>
          <AppView justifyContent="space-between">
            <AppText textStyle="medium_14_20">{item.symbol}</AppText>
            <AppText textStyle="regular_12_18">{item.name}</AppText>
          </AppView>
          <AppView alignItems="flex-end" justifyContent="space-between">
            <AppText textStyle="medium_14_20">
              {formatNumber(
                Number(item?.totalBalanceAcrossNetworks.balance ?? 0),
                undefined,
                2,
                getDecimals(item.networks[0]?.asset.decimals),
              )}
            </AppText>
            <AppText textStyle="regular_12_18" color={secondaryTextColor.color}>
              {formatNumber(
                Number(item?.totalBalanceAcrossNetworks.balanceUsd ?? 0),
                'currency',
                2,
                getDecimals(item.networks[0]?.asset.decimals),
              )}
            </AppText>
          </AppView>
        </AppView>
        <AppView />
      </AppTouchable>
      {showAssets && hasAssets && (
        <>
          <AppView
            alignSelf="center"
            height={1}
            backgroundColor={colors.inputBorderColor}
            width="100%"
            marginVertical={15}
          />
          <AppView marginLeft={25}>
            <NetworkItem networks={item.networks} />
          </AppView>
        </>
      )}
    </AppView>
  );
};
