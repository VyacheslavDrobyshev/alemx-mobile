import { ImageProps, ImageRequireSource } from 'react-native';

import { AppViewProps } from '../AppView/types';

export type AppImageUriProps = { uri: string };
export type AppImageSourceProps = { source: ImageRequireSource };

export type AppImageProps = (AppImageUriProps | AppImageSourceProps) &
  Omit<ImageProps, 'source' | 'width' | 'height'> &
  Omit<AppViewProps, 'children'>;
