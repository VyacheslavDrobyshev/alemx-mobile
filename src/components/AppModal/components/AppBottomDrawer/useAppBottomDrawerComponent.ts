import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { useAppTheme } from '@app/theme';

import { AppBottomDrawerProps } from './types';

export const useAppBottomDrawerComponent = ({
  closeModal,
  onClose: onCloseProp,
  ...rest
}: AppBottomDrawerProps) => {
  const theme = useAppTheme();

  const { bottom, top } = useSafeAreaInsets();

  const onClose = useCallback(async () => {
    await onCloseProp?.();
    closeModal();
  }, [closeModal, onCloseProp]);

  return {
    theme,
    bottom,
    onClose,
    top,
    ...rest,
  };
};
