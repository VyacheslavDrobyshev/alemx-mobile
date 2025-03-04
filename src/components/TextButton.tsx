import React, { FC, useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import Icon, { IconType } from './Icon';

import LoadingIcon from '../assets/icons/loading.svg';

import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
    size?: 'big' | 'medium' | 'small' | 'xsmall';
    disabled?: boolean;
    loading?: boolean;
    pressedOpacity?: number;
    leftIcon?: IconType;
    rightIcon?: IconType;
    title?: string;
    onPress: () => void;
};

const TextButton: FC<Props> = (props) => {
    const {
        size = 'big',
        disabled,
        loading,
        pressedOpacity = 1,
        leftIcon,
        rightIcon,
        title,
        onPress,
    } = props;

    const styles = createStyles(size);

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                disabled && styles.containerDisabled,
                {
                    opacity: pressed ? pressedOpacity : 1,
                    borderRadius: pressed ? 0 : scale(8),
                },
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {
                leftIcon && (
                    <View style={styles.leftIconContainer}>
                        <Icon
                            name={leftIcon}
                            fill={
                                isPressed
                                ? COLORS.main6
                                : disabled && COLORS.main9
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
                            isPressed && styles.titlePressed,
                            disabled && styles.titleDisabled,
                        ]}
                    >
                        {title}
                    </Text>
                )
            }
            
            {
                (rightIcon || loading)
                && (
                    <View style={styles.rightIconContainer}>
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
                                    fill={
                                        isPressed
                                        ? COLORS.main6
                                        : disabled && COLORS.main9
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
                        ...TYPOGRAPHY.f16_Body,
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
                        ...TYPOGRAPHY.f16_Body,
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
                        ...TYPOGRAPHY.f16_Body,
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
                        ...TYPOGRAPHY.f16_Body,
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
