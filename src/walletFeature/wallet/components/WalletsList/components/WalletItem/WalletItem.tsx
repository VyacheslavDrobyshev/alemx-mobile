import { AppText, AppTouchable, AppView } from '@app/walletFeature/wallet/common/components';
import { FC } from 'react';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { formatNumber } from '@app/walletFeature/wallet/common/utils/number';
import { AppImage } from '@app/walletFeature/wallet/common/components/AppImage/AppImage';
import { ModifiedWallet } from '@app/walletFeature/wallet/components/WalletsList/WalletsList';

export const WalletItem: FC<{
  item: ModifiedWallet;
  onPress?: (item: ModifiedWallet) => void;
  showNetwork?: boolean;
}> = ({ item, onPress, showNetwork }) => {
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
        {item.cryptoAsset.image ? (
          <AppView>
            <AppImage
              uri={item.cryptoAsset.image}
              height={icon.height}
              width={icon.width}
              marginRight={icon.marginRight}
            />
            {showNetwork && item.network.image ? (
              <AppView
                bottom={0}
                left={20}
                position="absolute"
                borderWidth={2}
                borderRadius={15}
                borderColor={colors.primaryLightColor}>
                <AppImage height={10} width={10} uri={item.network.image} />
              </AppView>
            ) : null}
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
              {item.cryptoAsset.symbol.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppView justifyContent="space-between" flexDirection="row" flex={1}>
          <AppView justifyContent="space-between">
            <AppText textStyle="medium_14_20">
              {item.cryptoAsset.symbol}
            </AppText>
            <AppText textStyle="regular_12_18">{item.cryptoAsset.name}</AppText>
          </AppView>
          {showNetwork ? (
            <AppView alignItems="center" flexDirection="row">
              {!!item.network.image && (
                <AppImage
                  marginRight={10}
                  height={20}
                  width={20}
                  uri={item.network.image}
                />
              )}
              <AppText textStyle="medium_12_18">{item.network.name}</AppText>
            </AppView>
          ) : (
            <AppView alignItems="flex-end" justifyContent="space-between">
              <AppText textStyle="medium_14_20">
                {formatNumber(
                  Number(item.balancesByAsset?.balance ?? 0),
                  undefined,
                  2,
                  item.cryptoAsset.decimals ?? 2,
                )}
              </AppText>
              <AppText
                textStyle="regular_12_18"
                color={secondaryTextColor.color}>
                {formatNumber(
                  Number(item.balancesByAsset?.balanceUsd ?? 0),
                  'currency',
                  2,
                  item.cryptoAsset.decimals ?? 2,
                )}
              </AppText>
            </AppView>
          )}
        </AppView>
        <AppView />
      </AppTouchable>
    </AppView>
  );
};
