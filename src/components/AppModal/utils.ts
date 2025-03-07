import { AppBottomDrawerProps } from './components/AppBottomDrawer/AppBottomDrawer';
import { AppDialogProps } from './components/AppDialog/types';
import { AppModalContainerProps } from './components/AppModalContainer/types';
import { AppModalType } from './constants';
import { AppModalVariantsProps } from './types';

export const isAppDialogProps = (
  props: AppModalVariantsProps,
): props is AppDialogProps => props.type === AppModalType.Dialog;

export const isAppBottomDrawerProps = (
  props: AppModalVariantsProps,
): props is AppBottomDrawerProps => props.type === AppModalType.BottomDrawer;

export const isAppModalContainerProps = (
  props: AppModalVariantsProps,
): props is AppModalContainerProps => props.type === AppModalType.Container;
