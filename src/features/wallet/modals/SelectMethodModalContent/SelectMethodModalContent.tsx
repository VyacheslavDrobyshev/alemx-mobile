import { useAppTheme } from '@app/theme';
import { FC, useCallback } from 'react';

import {
  AppIcon,
  AppText,
  AppTouchable,
  AppView,
  useAppBottomDrawer,
} from '@app/components';

import {
  SelectMethodModalContentProps,
  SelectMethodModalItem,
} from '@app/features/wallet/modals/SelectMethodModalContent/types.ts';

const ModalItem: FC<SelectMethodModalItem> = ({
  icon,
  action,
  title,
  subtitle,
}) => {
  const { closeBottomDrawer } = useAppBottomDrawer();
  const { colors } = useAppTheme();

  const onPress = useCallback(() => {
    closeBottomDrawer();
    action();
  }, [action, closeBottomDrawer]);

  return (
    <AppTouchable
      flexDirection={'row'}
      padding={10}
      borderRadius={8}
      onPress={onPress}
      height={80}
      width={'100%'}
      borderColor={colors.inputBorderColor}
      overflow={'hidden'}
      backgroundColor={colors.primaryLightColor}
      borderWidth={1}>
      <AppIcon marginRight={10} name={icon} color={colors.white} />
      <AppView justifyContent={'space-between'} flex={1}>
        <AppText textStyle={'medium_14_20'}>{title}</AppText>
        <AppText textStyle={'regular_12_18'} color={colors.inputLabelColor}>
          {subtitle}
        </AppText>
      </AppView>
      <AppIcon
        marginLeft={10}
        alignSelf={'center'}
        name={'ChevronRight'}
        color={colors.inputLabelColor}
      />
    </AppTouchable>
  );
};

export const SelectMethodModalContent: FC<SelectMethodModalContentProps> = ({
  items,
}) => {
  return (
    <>
      <AppView marginBottom={30} gap={10} justifyContent={'space-between'}>
        {items.map(item => (
          <ModalItem key={item.title} {...item} />
        ))}
      </AppView>
    </>
  );
};
