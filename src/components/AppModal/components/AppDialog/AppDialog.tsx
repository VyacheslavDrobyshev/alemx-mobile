import React, { FC } from 'react';
import { AppIcon } from '@app/components/AppIcon/AppIcon';
import { AppText } from '@app/components/AppText/AppText';
import { AppView } from '@app/components/AppView/AppView';
import { useAppTheme } from '@app/theme';
import { AppButton } from '@app/components/AppButton/AppButton';

import { AppModalContainer } from '../AppModalContainer/AppModalContainer';
import { useAppModal } from '@app/components';

import { AppDialogProps } from './types';

export const AppDialog: FC<AppDialogProps> = ({
  body,
  title,
  iconName,
  iconFill,
  description,
  buttons,
  withClose = true,
}) => {
  const { dialog, colors } = useAppTheme();
  const { closeModal } = useAppModal();

  return (
    <AppModalContainer>
      <AppView alignItems="center" {...dialog.container}>
        {withClose && (
          <AppView
            position="absolute"
            alignSelf="flex-end"
            top={+dialog.container.paddingTop! - dialog.close.marginTop}
            right={+dialog.container.paddingTop! - dialog.close.marginRight}>
            <AppIcon
              name="Cross"
              height={dialog.close.height}
              onPress={closeModal}
              fill={dialog.close.color}
              backgroundColor={colors.transparent}
            />
          </AppView>
        )}
        {iconName && (
          <AppIcon name={iconName} fill={iconFill} {...dialog.icon} />
        )}
        {title && <AppText {...dialog.text.title}>{title}</AppText>}
        {description && (
          <AppText {...dialog.text.description}>{description}</AppText>
        )}
        {body}

        {buttons?.map(props => (
          <AppButton key={props.title} {...props} />
        ))}
      </AppView>
    </AppModalContainer>
  );
};
