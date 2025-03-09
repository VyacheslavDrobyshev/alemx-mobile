import { createContext } from 'react';

import { AppToastContextType } from './types';

export const AppToastContext = createContext<AppToastContextType>({
  hideAll: () => {},
  show: () => () => {},
});
