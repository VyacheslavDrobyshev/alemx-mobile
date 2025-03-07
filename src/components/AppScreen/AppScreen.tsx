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
  withBottomTabs = false,
  title = '',
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { screen } = useAppTheme();

  return (
    <>
      <AppView
        flex={1}
        backgroundColor={backgroundColor ?? screen.default.backgroundColor}
        paddingBottom={bottom || 50}
        paddingTop={top}>
        {withHeader && <HeaderComponent title={title} />}
        <AppView flex={1} paddingHorizontal={screen.default.paddingHorizontal}>
          {noScroll ? (
            children
          ) : (
            <KeyboardAwareScrollView
              contentContainerStyle={screen.contentContainerStyle}>
              {children}
            </KeyboardAwareScrollView>
          )}
        </AppView>
        {withBottomTabs && <AppView height={50} />}
      </AppView>
    </>
  );
};
