import { AppColorValue } from '@app/theme/types';
import { ViewStyle, ViewProps } from 'react-native';

export type FlexProps = {
  flex?: ViewStyle['flex'];
  flexDirection?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flexWrap?: ViewStyle['flexWrap'];
  flexGrow?: ViewStyle['flexGrow'];
};

export type AppViewProps = FlexProps &
  ViewProps &
  Partial<
    Omit<ViewStyle, 'borderColor' | 'backgroundColor' | 'height' | 'width'>
  > & {
    backgroundColor?: AppColorValue;
    borderColor?: AppColorValue;
    borderTopRadius?: number;
    borderBottomRadius?: number;
    height?:
      | number
      | `${number}%`
      | `${number}${number}%`
      | `${number}${number}${number}%`
      | 'auto';
    width?:
      | number
      | `${number}%`
      | `${number}${number}%`
      | `${number}${number}${number}%`
      | 'auto';
  };

export type RequiredAppViewProps = Required<Omit<AppViewProps, 'children'>>;
