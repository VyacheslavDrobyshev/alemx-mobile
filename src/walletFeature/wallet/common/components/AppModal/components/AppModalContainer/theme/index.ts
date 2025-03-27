import { AppColorScheme } from '@app/walletFeature/wallet/common/theme/types';

import { ModalTheme } from './types';

export const getModalContainerTheme = (colors: AppColorScheme): ModalTheme => ({
  backdropColor: colors.modalOverlay,
});
