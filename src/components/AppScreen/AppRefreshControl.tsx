import { RefreshControl } from 'react-native';
import { FC, useCallback, useState } from 'react';
import { useAppTheme } from '@app/theme';

export const AppRefreshControl: FC<{
  onRefresh: (cb: () => void) => void;
}> = ({ onRefresh: onRefreshCb }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useAppTheme();

  const onRefresh = useCallback(() => {
    if (onRefreshCb) {
      setTimeout(() => {
        setRefreshing(true);
        onRefreshCb(() => {
          setRefreshing(false);
        });
      }, 1000);
    }
  }, [onRefreshCb]);

  return (
    <>
      <RefreshControl
        tintColor={colors.inputLabelColor}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};
