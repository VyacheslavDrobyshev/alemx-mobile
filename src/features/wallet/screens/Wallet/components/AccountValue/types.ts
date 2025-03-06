import { JSX } from 'react';
import { MainParamList } from '@app/features/rootNavigation/main/types.ts';

export type AccountValueButtonsList = {
  button: JSX.Element;
  title: string;
  route: keyof MainParamList;
};
