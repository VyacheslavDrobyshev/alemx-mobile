import { ElementChildrenType } from '@app/walletFeature/wallet/common/types';

export type AppTabProps = {
  children: ElementChildrenType[];
  tabs: string[];
  onTabChange?: (index: number) => void;
};
