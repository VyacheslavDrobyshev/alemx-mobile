import { ReactNode, MutableRefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { AppTextProps } from '../AppText/types';
import { AppViewProps } from '../AppView/types';

export type AppInputProps = Partial<AppViewProps> &
  Omit<TextInputProps, 'placeholderTextColor' | 'width'> & {
    textStyle?: AppTextProps['textStyle'];
    isValid?: boolean;
    errorMessage?: string;
    rightContent?: ReactNode;
    leftContent?: ReactNode;
    autoFocus?: boolean;
    inputRef?: MutableRefObject<TextInput | undefined>;
    withClear?: boolean;
    type?: 'disabled' | 'default' | 'error' | 'active' | 'filled';
  };
