import { FC } from 'react';
import EmptySvg from '@app/assets/icons/empty.svg';
import { AppText, AppView } from '@app/components';
import { AppButton } from '@app/components/AppButton/AppButton.tsx';
import { useAppTheme } from '@app/theme';

export const EmptyListPlaceholder: FC = () => {
  const { colors } = useAppTheme();
  return (
    <AppView flexGrow={1} alignItems={'center'} justifyContent={'center'}>
      <EmptySvg />
      <AppText
        marginVertical={30}
        color={colors.inputLabelColor}
        textStyle={'regular_16_20'}
        textAlign={'center'}>
        {
          'You have no assets in your wallet.\nMake your first deposit to receive\nfunds.'
        }
      </AppText>
      <AppButton width={183} leftIcon={'Money'} title={'DEPOSIT FUNDS'} />
    </AppView>
  );
};
