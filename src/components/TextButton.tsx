import React, { FC, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon, { IconType } from './Icon';

import LoadingIcon from '../assets/icons/loading.svg';

import TYPOGRAPHY from '../styles/typography';
import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    size?: 'big' | 'medium' | 'small' | 'xsmall';
    disabled?: boolean;
    loading?: boolean;
    pressedOpacity?: number;
    leftIcon?: IconType;
    leftIconColor?: string;
    leftIconDisabledColor?: string;
    leftIconContainerStyles?: StyleProp<ViewStyle>;
    rightIcon?: IconType;
    rightIconColor?: string;
    rightIconDisabledColor?: string;
    rightIconContainerStyles?: StyleProp<ViewStyle>;
    title?: string;
    titleStyles?: StyleProp<TextStyle>;
    titlePressedStyles?: StyleProp<TextStyle>;
    titleDisabledStyles?: StyleProp<TextStyle>;
    containerStyles?: StyleProp<ViewStyle>;
    containerDisabledStyles?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const TextButton: FC<Props> = (props) => {
    const {
        size = 'big',
        disabled,
        loading,
        pressedOpacity = 1,
        leftIcon,
        leftIconColor,
        leftIconDisabledColor,
        leftIconContainerStyles,
        rightIcon,
        rightIconColor,
        rightIconDisabledColor,
        rightIconContainerStyles,
        title,
        titleStyles,
        titlePressedStyles,
        titleDisabledStyles,
        containerStyles,
        containerDisabledStyles,
        onPress,
    } = props;

    const styles = createStyles(size);

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                containerStyles,
                disabled && containerDisabledStyles,
                {
                    opacity: pressed ? pressedOpacity : 1,
                    borderRadius: pressed ? 0 : scale(8),
                    backgroundColor: disabled ? COLORS.base2 : 'transparent',
                },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {
                leftIcon && (
                    <View style={[styles.leftIconContainer, leftIconContainerStyles]}>
                        <Icon
                            name={leftIcon}
                            width={scale(24)}
                            height={scale(24)}
                            fill={
                                isPressed
                                ? COLORS.main6
                                : disabled
                                ? leftIconDisabledColor || COLORS.main9
                                : leftIconColor
                            }
                        />
                    </View>
                )
            }

            {
                title && (
                    <Text
                        style={[
                            styles.title,
                            titleStyles,
                            isPressed && [styles.titlePressed, titlePressedStyles],
                            disabled && [styles.titleDisabled, titleDisabledStyles],
                        ]}
                    >
                        {title}
                    </Text>
                )
            }
            
            {
                (rightIcon || loading)
                && (
                    <View style={[styles.rightIconContainer, rightIconContainerStyles]}>
                        {
                            loading && (
                                <LoadingIcon
                                    width={scale(24)}
                                    height={scale(24)}
                                />
                            )
                        }

                        {
                            rightIcon && !loading && (
                                <Icon
                                    name={rightIcon}
                                    width={scale(24)}
                                    height={scale(24)}
                                    fill={
                                        isPressed
                                        ? COLORS.main6
                                        : disabled
                                        ? rightIconDisabledColor || COLORS.main9
                                        : rightIconColor
                                    }
                                />
                            )
                        }
                    </View>
                )
            }
        </Pressable>
    );
};

const createStyles = (size: 'big' | 'medium' | 'small' | 'xsmall') => {
    switch (size) {
        case ('big'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(24),
                    },
                    leftIconContainer: {
                        marginRight: scale(8),
                        zIndex: 2,
                    },
                    rightIconContainer: {
                        marginLeft: scale(8),
                        zIndex: 2,
                    },
                    title: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f16_Body_Medium_CAPS,
                        zIndex: 2,
                    },
                    titlePressed: {
                        color: COLORS.main6,
                    },
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    containerPressed: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(8),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
        case ('medium'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(24),
                    },
                    leftIconContainer: {
                        marginRight: scale(8),
                        zIndex: 2,
                    },
                    rightIconContainer: {
                        marginLeft: scale(8),
                        zIndex: 2,
                    },
                    title: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f16_Body_Medium_CAPS,
                        zIndex: 2,
                    },
                    titlePressed: {
                        color: COLORS.main6,
                    },
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    containerPressed: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(8),
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
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(24),
                    },
                    leftIconContainer: {
                        marginRight: scale(8),
                        zIndex: 2,
                    },
                    rightIconContainer: {
                        marginLeft: scale(8),
                        zIndex: 2,
                    },
                    title: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f16_Body_Medium_CAPS,
                        zIndex: 2,
                    },
                    titlePressed: {
                        color: COLORS.main6,
                    },
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    containerPressed: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(8),
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
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(24),
                    },
                    leftIconContainer: {
                        marginRight: scale(8),
                        zIndex: 2,
                    },
                    rightIconContainer: {
                        marginLeft: scale(8),
                        zIndex: 2,
                    },
                    title: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f16_Body_Medium_CAPS,
                        zIndex: 2,
                    },
                    titlePressed: {
                        color: COLORS.main6,
                    },
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    containerPressed: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(8),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
    };
};

export default TextButton;
