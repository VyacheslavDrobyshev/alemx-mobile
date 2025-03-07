import { AppColorScheme } from '@app/theme/types';

import { ModalTheme } from './types';

export const getModalContainerTheme = (colors: AppColorScheme): ModalTheme => ({
  backdropColor: colors.modalOverlay,
});
