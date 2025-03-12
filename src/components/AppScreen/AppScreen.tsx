import { AppView } from '@app/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@app/theme';
import { FC } from 'react';
import { AppScreenProps } from '@app/components/AppScreen/types.ts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderComponent } from '@app/components/AppScreen/components/HeaderComponent.tsx';
import { StyleSheet } from 'react-native';
import absoluteFillObject = StyleSheet.absoluteFillObject;
import { AppActivityIndicator } from '@app/components/AppActivityIndicator/AppActivityIndicator.tsx';

export const AppScreen: FC<AppScreenProps> = ({
  children,
  backgroundColor,
  noScroll = false,
  withHeader = true,
  withBottomTabs = false,
  title = '',
  isLoading,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { screen, colors } = useAppTheme();

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
        {/*todo remove before integration*/}
      </AppView>
      {isLoading && (
        <AppView
          {...absoluteFillObject}
          backgroundColor={colors.modalOverlay}
          alignItems={'center'}
          justifyContent={'center'}>
          <AppActivityIndicator />
        </AppView>
      )}
    </>
  );
};
