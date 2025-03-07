import { AppColorScheme } from '@app/theme/types';

import { DialogTheme } from './types';

export const getDialogTheme = (colors: AppColorScheme): DialogTheme => ({
  container: {
    marginHorizontal: 37,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 25,
  },
  text: {
    title: {
      textStyle: 'medium_16_24',
      marginBottom: 20,
      textAlign: 'center',
    },
    description: { textStyle: 'regular_14_20', textAlign: 'center' },
  },
  icon: {
    height: 52,
    width: 52,
    marginBottom: 27,
  },
  close: {
    height: 42,
    marginTop: 27,
    marginRight: 27,
    color: colors.text,
  },
  footer: {
    paddingTop: 25,
  },
});
