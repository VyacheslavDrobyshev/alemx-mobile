import { useAppModal } from './useAppModal';

export const useAppDialog = () => {
  const { openDialog, closeModal: closeDialog } = useAppModal();

  return { openDialog, closeDialog };
};
