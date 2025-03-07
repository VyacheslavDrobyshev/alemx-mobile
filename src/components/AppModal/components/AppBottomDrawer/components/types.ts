export type AppBottomDrawerHeaderProps = {
  title?: string | null;
  subTitle?: string | null;
  withCloseButton?: boolean;
  onClose?: () => void | Promise<void>;
};
