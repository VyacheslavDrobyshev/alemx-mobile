import { FormikConfig } from 'formik';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

export type Field<V> = {
  value: V;
  onChangeText: (value: V) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errorMessage: string;
  isValid: boolean;
  variant: 'normal' | 'error';
  onLayout?: (e: LayoutChangeEvent) => void;
  setValue: (value: V | undefined) => void;
};

export type FormFields<FV = object> = {
  [key in keyof FV]: Field<FV[key]>;
};

export type UseFormFormikConfig<FV> = Omit<
  FormikConfig<FV>,
  'initialTouched'
> & {
  initialTouched?: FormikConfig<FV>['initialTouched'] | true;
  ignoredFields?: (keyof FV)[];
};
