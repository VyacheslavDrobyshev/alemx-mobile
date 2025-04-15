import { ElementChildrenType } from '@app/walletFeature/wallet/common/types';
import { AppColorValue } from '@app/walletFeature/wallet/common/theme';

export type AppScreenProps = {
  children: ElementChildrenType;
  backgroundColor?: AppColorValue;
  noScroll?: boolean;
  withHeader?: boolean;
  withBottomTabs?: boolean;
  title?: string;
  isLoading?: boolean;
  paddingBottom?: number;
};
