import React, { FC } from 'react';
import { BlurView } from '@react-native-community/blur';

import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { noop } from 'lodash';
import { AppView } from '@app/components/AppView/AppView';

import { AppBottomDrawerProps } from './types';
import { useAppBottomDrawerComponent } from './useAppBottomDrawerComponent';
import { AppBottomDrawerHeader } from '@app/components';

export const AppBottomDrawer: FC<AppBottomDrawerProps> = props => {
  const {
    theme,
    bottom,
    onClose,
    body,
    minHeight,
    noBottomInset,
    title,
    withCloseButton,
    closeOnBackdropPress = true,
    subTitle,
  } = useAppBottomDrawerComponent(props);

  return (
    <AppView flex={1} justifyContent="flex-end">
      <TouchableWithoutFeedback onPress={closeOnBackdropPress ? onClose : noop}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
        />
      </TouchableWithoutFeedback>
      <AppView
        borderTopLeftRadius={theme.drawer.container.borderTopRadius}
        borderTopRightRadius={theme.drawer.container.borderTopRadius}
        paddingTop={theme.drawer.container.borderTopRadius}
        backgroundColor={theme.drawer.container.backgroundColor}
        maxHeight={theme.drawer.container.maxHeight}
        minHeight={minHeight}
        paddingBottom={noBottomInset ? 0 : bottom || 30}
        paddingHorizontal={theme.drawer.container.paddingHorizontal}>
        <>
          <AppBottomDrawerHeader
            title={title}
            subTitle={subTitle}
            withCloseButton={withCloseButton}
            onClose={onClose}
          />
          {body}
        </>
      </AppView>
    </AppView>
  );
};

export * from './types';
