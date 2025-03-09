import { useCallback, useContext } from 'react';

import { AppToastContext } from './context';

export const useAppToast = () => {
  const context = useContext(AppToastContext);

  const showError = useCallback(
    (message: string, autoHide = true) => {
      return context.show({ message, type: 'error', autoHide });
    },
    [context],
  );

  const showSuccess = useCallback(
    (message: string, autoHide = true) => {
      return context.show({ message, type: 'success', autoHide });
    },
    [context],
  );

  return { showSuccess, showError, hideAll: context.hideAll };
};
