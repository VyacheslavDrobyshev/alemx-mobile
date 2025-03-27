import { AppView } from '@app/walletFeature/wallet/common/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@app/walletFeature/wallet/common/theme';
import { FC } from 'react';
import { AppScreenProps } from '@app/walletFeature/wallet/common/components/AppScreen/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderComponent } from '@app/walletFeature/wallet/common/components/AppScreen/components/HeaderComponent';
import { StyleSheet } from 'react-native';
import { AppActivityIndicator } from '@app/walletFeature/wallet/common/components/AppActivityIndicator/AppActivityIndicator';

const { absoluteFillObject } = StyleSheet;

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
              keyboardShouldPersistTaps="never"
              contentContainerStyle={screen.contentContainerStyle}>
              {children}
            </KeyboardAwareScrollView>
          )}
        </AppView>
        {withBottomTabs && <AppView height={50} />}
      </AppView>
      {isLoading && (
        <AppView
          {...absoluteFillObject}
          backgroundColor={colors.modalOverlay}
          alignItems="center"
          justifyContent="center">
          <AppActivityIndicator />
        </AppView>
      )}
    </>
  );
};
