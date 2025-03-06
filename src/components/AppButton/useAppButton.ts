import { useAppTheme } from '@app/theme';

import { AppButtonProps } from './types';

export const useAppButton = ({
  type = 'primary',
  disabled,
  isLoading,
}: AppButtonProps) => {
  const theme = useAppTheme();
  const buttonThemeProps =
    disabled || isLoading ? theme.button.disabled : theme.button[type];

  return {
    containerProps: buttonThemeProps.container,
    textProps: buttonThemeProps.text,
    theme,
  };
};
