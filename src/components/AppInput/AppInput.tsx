import React, { FC, LegacyRef } from 'react';
import { TextInput } from 'react-native';
import {
  AppIcon,
  AppTouchable,
  AppText,
  AppView,
  AppErrorText,
} from '@app/components';

import { AppInputProps } from './types';
import { useAppInput } from './useAppInput';

export const AppInput: FC<AppInputProps> = props => {
  const {
    errorMessage,
    value,
    onChangeText,
    editable,
    returnKeyType,
    keyboardType,
    maxLength,
    margin,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    onLayout,
    selection,
    numberOfLines = 1,
    autoCorrect = false,
    leftContent,
    rightContent,
    placeholder,
    withClear,
    secureTextEntry,
    borderRadius,
    paddingHorizontal,
    paddingVertical,
  } = props;

  const {
    onFocusInner,
    onBlurInner,
    innerRef,
    secure,
    toggleSecure,
    inputStyle,
    textInputStyle,
    clearInput,
    input,
    colors,
  } = useAppInput(props);

  return (
    <AppView onLayout={onLayout}>
      <AppText
        marginBottom={input.placeholder.marginBottom}
        color={input.placeholder.color}
        textStyle="medium_16_24">
        {placeholder}
      </AppText>
      <AppView
        margin={margin}
        marginHorizontal={marginHorizontal}
        marginVertical={marginVertical}
        marginLeft={marginLeft}
        marginRight={marginRight}
        style={inputStyle}
        borderRadius={borderRadius ?? input.container.borderRadius}
        borderWidth={input.container.borderWidth}
        flexDirection="row"
        paddingVertical={paddingVertical ?? input.container.paddingVertical}
        paddingHorizontal={
          paddingHorizontal ?? input.container.paddingHorizontal
        }>
        {leftContent && (
          <AppView
            paddingRight={input.container.paddingHorizontal - 4}
            alignItems="center"
            flexDirection="row">
            {leftContent}
          </AppView>
        )}
        <AppView
          justifyContent="space-around"
          height={input.container.height}
          flex={1}>
          <TextInput
            editable={editable}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            maxLength={maxLength}
            selection={selection}
            numberOfLines={numberOfLines}
            autoCorrect={autoCorrect}
            secureTextEntry={secure}
            ref={innerRef as LegacyRef<TextInput>}
            onBlur={onBlurInner}
            onFocus={onFocusInner}
            onChangeText={onChangeText}
            value={value}
            style={textInputStyle}
            placeholderTextColor={colors.inputItemColor}
            placeholder={placeholder}
          />
        </AppView>
        <AppView alignItems="center" flexDirection="row">
          {secureTextEntry && (
            <AppTouchable marginLeft={10} onPress={toggleSecure}>
              {secure ? (
                <AppIcon
                  height={20}
                  stroke={colors.inputItemColor}
                  name="NotCrossEye"
                />
              ) : (
                <AppIcon
                  height={20}
                  stroke={colors.inputItemColor}
                  name="CrossEye"
                />
              )}
            </AppTouchable>
          )}
          {withClear && (
            <AppTouchable onPress={clearInput} marginLeft={10}>
              <AppIcon height={17} fill={colors.inputItemColor} name="Cross" />
            </AppTouchable>
          )}
          {rightContent}
        </AppView>
      </AppView>

      <AppView minHeight={10}>
        {!!errorMessage && (
          <AppView
            marginBottom={3}
            borderRadius={5}
            backgroundColor={input.errorMessage.backgroundColor}
            justifyContent="center">
            <AppErrorText>{errorMessage}</AppErrorText>
          </AppView>
        )}
      </AppView>
    </AppView>
  );
};
