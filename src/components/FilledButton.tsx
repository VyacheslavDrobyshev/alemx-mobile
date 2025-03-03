import React, { FC, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon, { IconType } from './Icon';

import LoadingIcon from '../assets/icons/loading.svg';

import TYPOGRAPHY from '../styles/typography';
import SPACING from '../styles/spacing';
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
    titleDisabledStyles?: StyleProp<TextStyle>;
    containerStyles?: StyleProp<ViewStyle>;
    containerDisabledStyles?: StyleProp<ViewStyle>;
    shadowStyles?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const FilledButton: FC<Props> = (props) => {
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
        titleDisabledStyles,
        containerStyles,
        containerDisabledStyles,
        shadowStyles,
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
                disabled && [styles.containerDisabled, containerDisabledStyles],
                { opacity: pressed ? pressedOpacity : 1 },
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
                                disabled
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
                                        disabled
                                        ? rightIconDisabledColor || COLORS.main9
                                        : rightIconColor
                                    }
                                />
                            )
                        }
                    </View>
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
                        paddingHorizontal: scale(SPACING.lg),
                        borderRadius: scale(8),
                        backgroundColor: COLORS.main4,
                    },
                    containerDisabled: {
                        backgroundColor: COLORS.base2,
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
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(13),
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
                        paddingHorizontal: scale(SPACING.lg),
                        borderRadius: scale(8),
                        backgroundColor: COLORS.main4,
                    },
                    containerDisabled: {
                        backgroundColor: COLORS.base2,
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
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
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
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(SPACING.lg),
                        borderRadius: scale(8),
                        backgroundColor: COLORS.main4,
                    },
                    containerDisabled: {
                        backgroundColor: COLORS.base2,
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
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
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
                        height: scale(56),
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(SPACING.lg),
                        borderRadius: scale(8),
                        backgroundColor: COLORS.main4,
                    },
                    containerDisabled: {
                        backgroundColor: COLORS.base2,
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
                    titleDisabled: {
                        color: COLORS.main9,
                    },
                    shadow: {
                        position: 'absolute',
                        top: -scale(5),
                        right: -scale(5),
                        bottom: -scale(5),
                        left: -scale(5),
                        borderRadius: scale(13),
                        borderWidth: scale(5),
                        borderColor: COLORS.base200,
                        backgroundColor: 'transparent',
                    },
                })
            );
    };
};

export default FilledButton;
