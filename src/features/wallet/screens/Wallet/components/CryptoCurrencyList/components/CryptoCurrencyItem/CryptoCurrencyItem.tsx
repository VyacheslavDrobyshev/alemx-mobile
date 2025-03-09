import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { AssetsData } from '@app/features/wallet/screens/Wallet/redux/types.ts';

// import { formatNumber } from '@app/utils/number.ts';
import { Image } from 'react-native';

export const CryptoCurrencyItem = ({
  item,
  onPress,
}: {
  item: AssetsData;
  onPress?: (item: AssetsData) => void;
}) => {
  const {
    colors,
    cryptoCurrencyList: { secondaryTextColor, itemContainer, icon },
  } = useAppTheme();

  return (
    <AppTouchable
      onPress={() => onPress?.(item)}
      borderWidth={itemContainer.borderWidth}
      borderColor={itemContainer.borderColor}
      borderRadius={itemContainer.borderRadius}
      marginBottom={itemContainer.marginBottom}
      height={itemContainer.height}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={itemContainer.paddingHorizontal}
      backgroundColor={colors.primaryLightColor}>
      {item.image ? (
        <Image
          src={item.image}
          height={icon.height}
          width={icon.width}
          style={{ marginRight: icon.marginRight }}
        />
      ) : (
        <AppView
          alignItems={'center'}
          justifyContent={'center'}
          height={icon.height}
          width={icon.width}
          borderRadius={icon.borderRadius}
          backgroundColor={colors.buttonPrimary}
          marginRight={icon.marginRight}>
          <AppText textStyle={'semi_bold_12_18'}>
            {item.symbol.slice(0, 2)}
          </AppText>
        </AppView>
      )}

      <AppView flex={1}>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText textStyle={'medium_14_20'}>{item.symbol}</AppText>
          <AppText textStyle={'medium_14_20'}>
            {/*{formatNumber(item.balance)}*/}
          </AppText>
        </AppView>
        <AppView flexDirection={'row'} justifyContent={'space-between'}>
          <AppText textStyle={'regular_12_18'}>{item.name}</AppText>
          <AppText textStyle={'regular_12_18'} color={secondaryTextColor.color}>
            {/*{formatNumber(item.balanceUsd, 'currency')}*/}
          </AppText>
        </AppView>
      </AppView>
      <AppView />
    </AppTouchable>
  );
};
