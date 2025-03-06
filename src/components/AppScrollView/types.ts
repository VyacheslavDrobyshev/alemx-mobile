import { AppColorValue } from '@app/theme/types';
import { ViewStyle, ScrollViewProps } from 'react-native';

export type FlexProps = {
  flex?: ViewStyle['flex'];
  flexDirection?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flexWrap?: ViewStyle['flexWrap'];
  flexGrow?: ViewStyle['flexGrow'];
};

export type AppScrollViewProps = FlexProps &
  ScrollViewProps &
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
      | `${number}${number}${number}%`;
    width?:
      | number
      | `${number}%`
      | `${number}${number}%`
      | `${number}${number}${number}%`;
  };
