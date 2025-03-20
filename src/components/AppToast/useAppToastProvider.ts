import { useEffect, useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTimeout } from '@app/types';
import { useAppTheme } from '@app/theme';

import {
  AppToastContextType,
  AppToastMessage,
  AppToastStylingProps,
} from './types';

const toastDuration = 6000;
export const useAppToastProvider = () => {
  const [queue, setQueue] = useState<AppToastMessage[]>([]);
  const { top } = useSafeAreaInsets();

  const theme = useAppTheme();

  const timeoutRef = useRef<AppTimeout>(undefined);

  const value = useMemo<AppToastContextType>(
    () => ({
      hideAll: () => setQueue([]),
      show: message => {
        setQueue(prev => [...prev, message]);
        return () => {
          setQueue(prev => prev.filter(m => m !== message));
        };
      },
    }),
    [],
  );

  const toast = queue[queue.length - 1];

  useEffect(() => {
    if (!timeoutRef.current && toast && toast.autoHide) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = undefined;
        setQueue(prev => prev.slice(0, -1));
      }, toastDuration);
    }
  }, [toast]);

  const toastProps = useMemo<AppToastStylingProps | undefined>(
    () =>
      toast
        ? {
            view: {
              height: 64,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: theme.colors.primary,
              borderWidth: 1,
              borderColor: theme.colors.inputBorderColor,
              flexDirection: 'row',
              alignItems: 'center',
            },
            text: {
              textStyle: 'regular_14_20',
              flexShrink: 1,
            },
          }
        : undefined,
    [theme.colors.inputBorderColor, theme.colors.primary, toast],
  );

  return { value, toast, toastProps, top: top + 16, theme };
};
