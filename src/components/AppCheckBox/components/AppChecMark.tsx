import { AppIcon } from '@app/components/AppIcon/AppIcon';
import { AppView } from '@app/components/AppView/AppView';
import { useAppTheme } from '@app/theme';
import React, { FC } from 'react';

export const AppCheckMark: FC<{ isChecked: boolean | undefined }> = ({
  isChecked,
}) => {
  const { checkBox } = useAppTheme();

  return (
    <AppView
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...checkBox.box}
      width={checkBox.box.height}
      {...(isChecked ? checkBox.checked : checkBox.unchecked)}>
      {isChecked && <AppIcon name="Check" stroke={checkBox.icon.color} />}
    </AppView>
  );
};
