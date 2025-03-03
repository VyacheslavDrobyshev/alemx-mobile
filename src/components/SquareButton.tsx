import React, { FC, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Icon, { IconType } from './Icon';

import LoadingIcon from '../assets/icons/loading.svg';

import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    size?: 'medium' | 'small' | 'xsmall';
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
    pressedOpacity?: number;
    icon: IconType;
    iconColor?: string;
    iconDisabledColor?: string;
    containerStyles?: StyleProp<ViewStyle>;
    containerDisabledStyles?: StyleProp<ViewStyle>;
    shadowStyles?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const SquareButton: FC<Props> = (props) => {
    const {
        size = 'medium',
        outline = false,
        disabled,
        loading,
        pressedOpacity = 1,
        icon,
        iconColor,
        iconDisabledColor,
        containerStyles,
        containerDisabledStyles,
        shadowStyles,
        onPress,
    } = props;

    const styles = createStyles(outline, size);

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                containerStyles,
                disabled && [styles.containerDisabled, containerDisabledStyles],
                { opacity: pressed ? pressedOpacity : 1 },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        > 
            {
                loading
                ? (
                    <LoadingIcon
                        width={scale(24)}
                        height={scale(24)}
                    />
                )
                : (
                    <Icon
                        name={icon}
                        width={scale(24)}
                        height={scale(24)}
                        fill={
                            disabled
                            ? iconDisabledColor || COLORS.main9
                            : iconColor
                        }
                    />
                )
            }

            {
                isPressed && (
                    <View
                        style={[
                            styles.shadow,
                            shadowStyles,
                        ]}
                    />
                )
            }
        </Pressable>
    );
};

const createStyles = (outline: boolean, size: 'medium' | 'small' | 'xsmall') => {
    switch (size) {
        case ('medium'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(48),
                        width: scale(48),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(8),
                        borderWidth: outline ? scale(1) : 0,
                        borderColor: outline ? COLORS.main4 : 'transparent',
                        backgroundColor: outline ? 'transparent' : COLORS.main4,
                    },
                    containerDisabled: {
                        borderWidth: 0,
                        backgroundColor: COLORS.base2,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(outline ? 6 : 5),
                        right: -scale(outline ? 6 : 5),
                        bottom:-scale(outline ? 6 : 5),
                        left: -scale(outline ? 6 : 5),
                        borderRadius: scale(13),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
        case ('small'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(48),
                        width: scale(48),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(8),
                        borderWidth: outline ? scale(1) : 0,
                        borderColor: outline ? COLORS.main4 : 'transparent',
                        backgroundColor: outline ? 'transparent' : COLORS.main4,
                    },
                    containerDisabled: {
                        borderWidth: 0,
                        backgroundColor: COLORS.base2,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(outline ? 6 : 5),
                        right: -scale(outline ? 6 : 5),
                        bottom:-scale(outline ? 6 : 5),
                        left: -scale(outline ? 6 : 5),
                        borderRadius: scale(13),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
        case ('xsmall'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(48),
                        width: scale(48),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(8),
                        borderWidth: outline ? scale(1) : 0,
                        borderColor: outline ? COLORS.main4 : 'transparent',
                        backgroundColor: outline ? 'transparent' : COLORS.main4,
                    },
                    containerDisabled: {
                        borderWidth: 0,
                        backgroundColor: COLORS.base2,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(outline ? 6 : 5),
                        right: -scale(outline ? 6 : 5),
                        bottom:-scale(outline ? 6 : 5),
                        left: -scale(outline ? 6 : 5),
                        borderRadius: scale(13),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
    };
};

export default SquareButton;
