import { AppText, AppTouchable, AppView } from '@app/components';
import { useAppTheme } from '@app/theme';
import { UserData } from '@app/features/wallet/redux/types';

export function UserItem({
  item,
  onPress,
}: {
  item: UserData;
  onPress?: (item: UserData) => void;
}) {
  const {
    colors,
    cryptoCurrencyList: { itemContainer, icon },
  } = useAppTheme();

  return (
    <AppTouchable
      onPress={() => onPress?.(item)}
      borderWidth={itemContainer.borderWidth}
      borderColor={itemContainer.borderColor}
      borderRadius={itemContainer.borderRadius}
      marginBottom={itemContainer.marginBottom}
      height={itemContainer.height}
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={itemContainer.paddingHorizontal}
      backgroundColor={colors.primaryLightColor}
    >
      <AppView
        alignItems="center"
        justifyContent="center"
        height={icon.height}
        width={icon.width}
        borderRadius={icon.borderRadius}
        backgroundColor={colors.buttonPrimary}
        marginRight={icon.marginRight}
      >
        <AppText textStyle="semi_bold_12_18">
          {item.username?.slice(0, 1).toUpperCase() || 'U'}
        </AppText>
      </AppView>

      <AppView flex={1}>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText textStyle="medium_14_20">{item.username}</AppText>
        </AppView>
        <AppView flexDirection="row" justifyContent="space-between">
          <AppText textStyle="regular_12_18">{item.email}</AppText>
        </AppView>
      </AppView>
      <AppView />
    </AppTouchable>
  );
}
