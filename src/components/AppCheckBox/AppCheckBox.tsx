import React, { FC, isValidElement } from 'react';
import { useAppTheme } from '@app/theme';

import { AppTouchable } from '@app/components';
import { AppView } from '@app/components';
import { AppErrorText } from '@app/components';

import { AppCheckBoxProps } from './types';
import { AppCheckMark } from './components/AppChecMark';
import { AppCheckBoxText } from './components/AppCheckBoxText';

export const AppCheckBox: FC<AppCheckBoxProps> = props => {
  const {
    value,
    children,
    color,
    disabled,
    textStyle,
    onPress,
    error,
    marginBottom,
    ...viewProps
  } = props;
  const { checkBox } = useAppTheme();

  return (
    <AppView>
      <AppView flexDirection="row">
        <AppTouchable
          {...viewProps}
          marginBottom={error ? 0 : marginBottom}
          onPress={onPress}
          disabled={disabled}>
          <AppCheckMark isChecked={value} />
        </AppTouchable>

        {children ? (
          isValidElement(children) ? (
            children
          ) : (
            <AppCheckBoxText textStyle={textStyle}>{children}</AppCheckBoxText>
          )
        ) : null}
      </AppView>

      <AppErrorText
        marginLeft={checkBox.box.height + checkBox.box.marginRight}
        marginBottom={marginBottom}>
        {error}
      </AppErrorText>
    </AppView>
  );
};

export * from './components/AppChecMark';
export * from './components/AppCheckBoxText';
