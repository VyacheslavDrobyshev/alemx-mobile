import { FC } from 'react';
import EmptySvg from '@app/walletFeature/wallet/common/assets/icons/empty.svg';
import { AppText, AppView } from '@app/walletFeature/wallet/common/components';
import { AppButton } from '@app/walletFeature/wallet/common/components/AppButton/AppButton';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';

export const EmptyListPlaceholder: FC<{
  onPressPlaceholderButton?: () => void;
  title: string;
}> = ({ onPressPlaceholderButton, title }) => {
  const { colors } = useAppTheme();

  return (
    <AppView flexGrow={1} alignItems="center" justifyContent="center">
      <EmptySvg />
      <AppText
        marginVertical={30}
        color={colors.inputLabelColor}
        textStyle="regular_16_20"
        textAlign="center"
      >
        {title}
      </AppText>
      {!!onPressPlaceholderButton && (
        <AppButton
          onPress={onPressPlaceholderButton}
          width={183}
          leftIcon="Money"
          title="DEPOSIT FUNDS"
        />
      )}
    </AppView>
  );
};
