import { isBoolean } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import { useAppTheme } from '@app/theme';

import { AppInputProps } from './types';

export const useAppInput = (props: AppInputProps) => {
  const {
    style,
    textStyle: textStyleProp,
    onFocus,
    onBlur,
    value,
    isValid,
    editable,
    autoFocus,
    inputRef,
    type = 'default',
    secureTextEntry,
    onChangeText,
  } = props;

  const { input, colors, text } = useAppTheme();

  const ref = useRef<TextInput>(null);
  const innerRef = inputRef || ref;

  const [isFocused, setIsFocused] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);

  const toggleSecure = useCallback(
    () => setSecure(prevState => !prevState),
    [],
  );

  const clearInput = useCallback(() => {
    onChangeText?.('');
  }, [onChangeText]);

  const focusInput = useCallback(() => {
    innerRef.current?.focus();
  }, [innerRef]);

  useEffect(() => {
    if (autoFocus && innerRef) {
      innerRef.current?.focus();
    }
  }, [autoFocus, innerRef]);

  const onFocusInner: typeof onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);

      onFocus?.(e);
    },
    [onFocus],
  );
  const onBlurInner: typeof onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);

      onBlur?.(e);
    },
    [onBlur],
  );

  const isDisabled = isBoolean(editable) && !editable;
  const isError = isBoolean(isValid) && !isValid;

  const inputType: AppInputProps['type'] = useMemo(() => {
    if (isDisabled) {
      return 'disabled';
    }
    if (isError) {
      return 'error';
    }
    if (type === 'default' && isFocused) {
      return 'active';
    }
    if (value) {
      return 'filled';
    }
    return type;
  }, [isFocused, isError, type, value, isDisabled]);

  const textStyle = textStyleProp ?? input.textStyle;

  const inputStyle = useMemo(
    () => [
      {
        fontSize: text[textStyle].fontSize,
        color: text.color,
        fontFamily: text[textStyle].fontFamily,
        fontWeight: text[textStyle].fontWeight,
      },
      input[inputType],
      style,
    ],
    [input, inputType, style, text, textStyle],
  );

  const textInputStyle = [...inputStyle, { paddingTop: 0, paddingBottom: 0 }];

  return {
    textInputStyle,
    inputStyle,
    isFocused,
    onFocusInner,
    onBlurInner,
    isDisabled,
    innerRef,
    secure,
    toggleSecure,
    clearInput,
    focusInput,
    input,
    colors,
  };
};
