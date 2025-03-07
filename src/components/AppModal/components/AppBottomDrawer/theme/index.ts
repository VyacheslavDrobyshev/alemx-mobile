import { Dimensions } from 'react-native';
import { AppColorScheme } from '@app/theme/types';

import { BottomDrawerTheme } from './types';

const { height } = Dimensions.get('window');

export const getDrawerTheme = (colors: AppColorScheme): BottomDrawerTheme => ({
  container: {
    borderTopRadius: 16,
    backgroundColor: colors.primaryLightColor,
    maxHeight: height * 0.91,
    minHeight: height * 0.4,
    paddingHorizontal: 16,
  },
  icon: {
    backgroundColor: colors.black,
  },
});
