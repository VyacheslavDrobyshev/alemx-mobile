import { FC } from 'react';
import EmptySvg from '@app/assets/icons/empty.svg';
import { AppText, AppView } from '@app/components';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import { useAppTheme } from '@app/theme';

export const EmptyListPlaceholder: FC<{
  onPressPlaceholderButton?: () => void;
  title: string;
}> = ({ onPressPlaceholderButton, title }) => {
  const { colors } = useAppTheme();

  return (
    <AppView flexGrow={1} alignItems={'center'} justifyContent={'center'}>
      <EmptySvg />
      <AppText
        marginVertical={30}
        color={colors.inputLabelColor}
        textStyle={'regular_16_20'}
        textAlign={'center'}>
        {title}
      </AppText>
      {!!onPressPlaceholderButton && (
        <AppButton
          onPress={onPressPlaceholderButton}
          width={183}
          leftIcon={'Money'}
          title={'DEPOSIT FUNDS'}
        />
      )}
    </AppView>
  );
};
