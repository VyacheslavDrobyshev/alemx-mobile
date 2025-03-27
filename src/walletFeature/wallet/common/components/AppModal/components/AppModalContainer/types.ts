import { ElementChildrenType } from '@app/walletFeature/wallet/common/types';
import { AppViewProps } from '@app/walletFeature/wallet/common/components/AppView/types';

import { AppModalType } from '../../constants';

export type AppModalContainerProps = {
  children: ElementChildrenType;
  type: AppModalType.Container;
  safeTop?: boolean;
  safeBottom?: boolean;
  justifyContent?: AppViewProps['justifyContent'];
  alignItems?: AppViewProps['alignItems'];
};
