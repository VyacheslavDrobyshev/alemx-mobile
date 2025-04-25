import { FC } from 'react';
import {
  AppText,
  AppTouchable,
} from '@app/walletFeature/wallet/common/components';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';

export const Tooltip: FC<{ value: string; closeTooltip: () => void }> = ({
  value,
  closeTooltip,
}) => {
  const { colors } = useAppTheme();
  return (
    <AppTouchable
      onPress={closeTooltip}
      borderWidth={1}
      borderColor={colors.inputBorderColor}
      justifyContent="center"
      alignItems="center"
      borderRadius={5}
      height={30}
      paddingHorizontal={10}
      backgroundColor={colors.primaryLightColor}>
      <AppText>{value}</AppText>
    </AppTouchable>
  );
};
