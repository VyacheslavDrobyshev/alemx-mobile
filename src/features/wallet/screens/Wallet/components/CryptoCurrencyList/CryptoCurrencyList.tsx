import { AppText, AppTouchable, AppView } from '@app/components';
import { FlatList, ListRenderItem } from 'react-native';
import { FC, useCallback } from 'react';
import { CryptoCurrencyListProps } from '@app/features/wallet/screens/Wallet/components/CryptoCurrencyList/types.ts';
import { AppUserWalletsDto } from '@app/features/wallet/screens/Wallet/redux/types.ts';
import { useAppTheme } from '@app/theme';

export const CryptoCurrencyList: FC<CryptoCurrencyListProps> = ({
  wallets,
}) => {
  const {
    colors,
    cryptoCurrencyList: {
      contentContainerStyle,
      secondaryTextColor,
      itemContainer,
      icon,
    },
  } = useAppTheme();

  const renderItem = useCallback<ListRenderItem<AppUserWalletsDto>>(
    ({ item }) => {
      return (
        <AppTouchable
          borderWidth={itemContainer.borderWidth}
          borderColor={itemContainer.borderColor}
          borderRadius={itemContainer.borderRadius}
          marginBottom={itemContainer.marginBottom}
          height={itemContainer.height}
          flexDirection={'row'}
          alignItems={'center'}
          paddingHorizontal={itemContainer.paddingHorizontal}
          backgroundColor={colors.primaryLightColor}>
          <AppView
            height={icon.height}
            width={icon.width}
            borderRadius={icon.borderRadius}
            backgroundColor={colors.white}
            marginRight={icon.marginRight}
          />
          <AppView flex={1}>
            <AppView flexDirection={'row'} justifyContent={'space-between'}>
              <AppText textStyle={'medium_14_20'}>
                {item.cryptoAsset.symbol}
              </AppText>
              <AppText textStyle={'medium_14_20'}>33,343.00</AppText>
            </AppView>
            <AppView flexDirection={'row'} justifyContent={'space-between'}>
              <AppText textStyle={'regular_12_18'}>
                {item.cryptoAsset.name}
              </AppText>
              <AppText
                textStyle={'regular_12_18'}
                color={secondaryTextColor.color}>
                $26.82
              </AppText>
            </AppView>
          </AppView>
          <AppView />
        </AppTouchable>
      );
    },
    [
      colors.primaryLightColor,
      colors.white,
      icon.borderRadius,
      icon.height,
      icon.marginRight,
      icon.width,
      itemContainer.borderColor,
      itemContainer.borderRadius,
      itemContainer.borderWidth,
      itemContainer.height,
      itemContainer.marginBottom,
      itemContainer.paddingHorizontal,
      secondaryTextColor.color,
    ],
  );

  return (
    <AppView flex={1}>
      <FlatList
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={wallets}
        renderItem={renderItem}
      />
    </AppView>
  );
};
