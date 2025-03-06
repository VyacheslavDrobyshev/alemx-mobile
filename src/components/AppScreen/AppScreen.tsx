import { AppView } from '@app/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@app/theme';
import { FC } from 'react';
import { AppScreenProps } from '@app/components/AppScreen/types.ts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderComponent } from '@app/components/AppScreen/components/HeaderComponent.tsx';

export const AppScreen: FC<AppScreenProps> = ({
  children,
  backgroundColor,
  noScroll = false,
  withHeader = true,
  title = '',
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { screen } = useAppTheme();

  return (
    <>
      {withHeader && <HeaderComponent title={title} />}
      <AppView
        flex={1}
        backgroundColor={backgroundColor ?? screen.default.backgroundColor}
        paddingHorizontal={screen.default.paddingHorizontal}
        paddingBottom={bottom}
        paddingTop={withHeader ? 10 : top}>
        {noScroll ? (
          children
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={screen.contentContainerStyle}>
            {children}
          </KeyboardAwareScrollView>
        )}
      </AppView>
    </>
  );
};
