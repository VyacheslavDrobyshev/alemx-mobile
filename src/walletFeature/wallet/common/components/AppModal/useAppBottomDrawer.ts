import { useAppModal } from './useAppModal';

export const useAppBottomDrawer = () => {
  const {
    openBottomDrawer,
    closeModal: closeBottomDrawer,
    closeAllModals,
  } = useAppModal();

  return { openBottomDrawer, closeBottomDrawer, closeAllModals };
};
