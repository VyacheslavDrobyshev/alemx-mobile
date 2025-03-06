import React, { FC, useState } from 'react';

import { StyleSheet, TextInput } from 'react-native';

import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
  disabled?: boolean;
  error?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

const CodeTextInput: FC<Props> = props => {
  const { disabled, error, value, onChangeText } = props;

  const styles = createStyles();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <TextInput
      value={value}
      maxLength={1}
      textAlign="center"
      style={[
        styles.input,
        error && styles.inputError,
        isFocused && styles.inputFocused,
        disabled && styles.inputDisabled,
      ]}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

const createStyles = () => {
  return StyleSheet.create({
    input: {
      height: scale(62),
      width: scale(62),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderWidth: scale(1),
      borderRadius: scale(8),
      borderColor: COLORS.main9,
      color: COLORS.main1,
      ...TYPOGRAPHY.f3_Heading,
    },
    inputError: {
      borderColor: COLORS.main5,
    },
    inputFocused: {
      borderColor: COLORS.main4,
    },
    inputDisabled: {
      borderColor: 'transparent',
      backgroundColor: COLORS.base2,
    },
  });
};

export default CodeTextInput;
