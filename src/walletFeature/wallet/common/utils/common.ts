import { SwapStatuses } from '@app/walletFeature/wallet/screens/Wallet/constants';
import { AppColorScheme } from '@app/walletFeature/wallet/common/theme';

export const capitalizeFirstLetter = (item: string) =>
  item &&
  item
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getStatusColor = (
  status: SwapStatuses,
  colors: AppColorScheme,
) => {
  switch (status) {
    case SwapStatuses.Completed:
      return colors.positiveStatus;
    case SwapStatuses.Cancelled:
      return colors.negativeStatus;
    case SwapStatuses.Failed:
      return colors.negativeStatus;
    case SwapStatuses.Pending:
      return colors.pendingStatus;
    case SwapStatuses.Processing:
      return colors.negativeStatus;
    case SwapStatuses.Submitted:
      return colors.positiveStatus;
    default:
      return colors.inputLabelColor;
  }
};
