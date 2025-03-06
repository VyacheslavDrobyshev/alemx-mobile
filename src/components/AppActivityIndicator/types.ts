import { ActivityIndicatorProps } from 'react-native';

import { AppViewProps } from '../AppView/types';

export type AppActivityIndicatorProps = {
  type?: 'primary' | 'secondary';
  size?: ActivityIndicatorProps['size'];
  absoluteFill?: boolean;
} & Omit<AppViewProps, 'children'>;
