import { AppText, AppTouchable, AppView } from '@app/components';
import { FC, useMemo } from 'react';
import { useAppTheme } from '@app/theme';
import { formatNumber } from '@app/utils/number';
import { AppImage } from '@app/components/AppImage/AppImage';
import { NetworkItem } from '@app/features/wallet/screens/WalletDetails/components/NetworkItem/NetworkItem';
import { WalletAssetWithBalance } from '@app/features/wallet/components/BalancesList/BalancesList';

export const BalanceItem: FC<{
  item: WalletAssetWithBalance;
  onPress?: (item: WalletAssetWithBalance) => void;
  showAssets?: boolean;
  hasAssets?: boolean;
  showNetwork?: boolean;
}> = ({ item, onPress, showAssets = false, hasAssets, showNetwork }) => {
  const {
    colors,
    cryptoCurrencyList: { secondaryTextColor, itemContainer, icon },
  } = useAppTheme();

  const decimals = useMemo(
    () => (item.decimals && item.decimals > 4 ? 4 : item.decimals ?? 2),
    [item.decimals],
  );

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
              {item.symbol.slice(0, 2)}
            </AppText>
          </AppView>
        )}

        <AppView justifyContent="space-between" flexDirection="row" flex={1}>
          <AppView justifyContent="space-between">
            <AppText textStyle="medium_14_20">{item.symbol}</AppText>
            <AppText textStyle="regular_12_18">{item.name}</AppText>
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
                  Number(item?.balance ?? 0),
                  undefined,
                  2,
                  decimals,
                )}
              </AppText>
              <AppText
                textStyle="regular_12_18"
                color={secondaryTextColor.color}>
                {formatNumber(
                  Number(item?.balanceUsd ?? 0),
                  'currency',
                  2,
                  decimals,
                )}
              </AppText>
            </AppView>
          )}
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
            <NetworkItem item={item} />
          </AppView>
        </>
      )}
    </AppView>
  );
};
