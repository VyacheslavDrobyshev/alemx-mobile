import { AppScrollView, AppView } from '@app/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@app/theme';
import { FC } from 'react';
import { AppScreenProps } from '@app/components/AppScreen/types.ts';

export const AppScreen: FC<AppScreenProps> = ({
  children,
  backgroundColor,
  noScroll = true,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { screen } = useAppTheme();

  return (
    <AppView
      flex={1}
      backgroundColor={backgroundColor ?? screen.default.backgroundColor}
      paddingHorizontal={screen.default.paddingHorizontal}
      paddingBottom={bottom}
      paddingTop={top}>
      {noScroll ? children : <AppScrollView>{children}</AppScrollView>}
    </AppView>
  );
};
