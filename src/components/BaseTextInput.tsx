import React, { FC, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle, Text, TextInput } from 'react-native';

import Icon, { IconType } from './Icon';

import COLORS from '../styles/colors';
import scale from '../styles/scale';
import TYPOGRAPHY from '../styles/typography';
import SPACING from '../styles/spacing';

type Props = {
    size?: 'medium' | 'small' | 'xsmall';
    disabled?: boolean;
    error?: string;
    value: string;
    placeholder?: string;
    label?: string;
    labelStyles?: StyleProp<TextStyle>;
    caption?: string;
    captionStyles?: StyleProp<TextStyle>;
    leftIcon?: IconType;
    leftIconColor?: string;
    leftIconDisabledColor?: string;
    rightIcon?: IconType;
    rightIconColor?: string;
    rightIconDisabledColor?: string;
    rightIconContainerStyles?: StyleProp<ViewStyle>;
    inputContainerStyles?: StyleProp<ViewStyle>;
    containerStyles?: StyleProp<ViewStyle>;
    containerDisabledStyles?: StyleProp<ViewStyle>;
    containerErrorStyles?: StyleProp<ViewStyle>;
    onChangeText: (text: string) => void;
};

const BaseTextInput: FC<Props> = (props) => {
    const {
        size = 'medium',
        disabled,
        error,
        value,
        placeholder,
        label,
        labelStyles,
        caption,
        captionStyles,
        leftIcon,
        leftIconColor,
        leftIconDisabledColor,
        rightIcon,
        rightIconColor,
        rightIconDisabledColor,
        rightIconContainerStyles,
        inputContainerStyles,
        containerStyles,
        containerDisabledStyles,
        onChangeText,
    } = props;

    const styles = createStyles(size);

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <View
            style={[
                styles.container,
                containerStyles,
                disabled && containerDisabledStyles,
            ]}
        >
            {
                label && (
                    <Text style={[styles.label, labelStyles]}>{label}</Text>
                )
            }

            <View
                style={[
                    styles.inputContainer,
                    inputContainerStyles,
                    isFocused && styles.inputContainerFocused,
                    error && styles.inputContainerError,
                    disabled && styles.inputContainerDisabled,
                ]}
            >
                {
                    leftIcon && (
                        <View style={styles.leftIconContainer}>
                            <Icon
                                name={leftIcon}
                                width={scale(24)}
                                height={scale(24)}
                                fill={
                                    disabled
                                    ? leftIconDisabledColor || COLORS.main9
                                    : leftIconColor || COLORS.main3
                                }
                            />
                        </View>
                    )
                }

                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.main3}
                    style={styles.input}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {
                    rightIcon && (
                        <Pressable
                            onPress={() => {}}
                            style={styles.rightIconContainer}
                        >
                            <Icon
                                name={rightIcon}
                                width={scale(24)}
                                height={scale(24)}
                                fill={
                                    disabled
                                    ? rightIconDisabledColor || COLORS.main9
                                    : rightIconColor || COLORS.main3
                                }
                            />
                        </Pressable>
                    )
                }
            </View>

            {
                error && !disabled
                ? <Text style={styles.errorText}>{error}</Text>
                : caption
                ? <Text style={[styles.caption, captionStyles]}>{caption}</Text>
                : null
            }
        </View>
    );
};

const createStyles = (size: 'medium' | 'small' | 'xsmall') => {
    switch (size) {
        case ('medium'):
            return (
                StyleSheet.create({
                    container: {
                        alignSelf: 'flex-start',
                    },
                    label: {
                        marginBottom: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f11_Body_Regular,
                    },
                    leftIconContainer: {
                        marginRight: SPACING.sm,
                    },
                    inputContainer: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SPACING.smd,
                        paddingHorizontal: SPACING.md,
                        borderWidth: scale(1),
                        borderRadius: scale(8),
                        borderColor: COLORS.main9,
                    },
                    inputContainerFocused: {
                        borderColor: COLORS.main11,
                    },
                    inputContainerDisabled: {
                        borderColor: 'transparent',
                        backgroundColor: COLORS.base2,
                    },
                    inputContainerError: {
                        borderColor: COLORS.main5,
                    },
                    input: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body_Large,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                })
            );
        case ('small'):
            return (
                StyleSheet.create({
                    container: {
                        alignSelf: 'flex-start',
                    },
                    label: {
                        marginBottom: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f11_Body_Regular,
                    },
                    leftIconContainer: {
                        marginRight: SPACING.sm,
                    },
                    inputContainer: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SPACING.smd,
                        paddingHorizontal: SPACING.md,
                        borderWidth: scale(1),
                        borderRadius: scale(8),
                        borderColor: COLORS.main9,
                    },
                    inputContainerFocused: {
                        borderColor: COLORS.main11,
                    },
                    inputContainerDisabled: {
                        borderColor: 'transparent',
                        backgroundColor: COLORS.base2,
                    },
                    inputContainerError: {
                        borderColor: COLORS.main5,
                    },
                    input: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body_Large,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                })
            );
        case ('xsmall'):
            return (
                StyleSheet.create({
                    container: {
                        alignSelf: 'flex-start',
                    },
                    label: {
                        marginBottom: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f11_Body_Regular,
                    },
                    leftIconContainer: {
                        marginRight: SPACING.sm,
                    },
                    inputContainer: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SPACING.smd,
                        paddingHorizontal: SPACING.md,
                        borderWidth: scale(1),
                        borderRadius: scale(8),
                        borderColor: COLORS.main9,
                    },
                    inputContainerFocused: {
                        borderColor: COLORS.main11,
                    },
                    inputContainerDisabled: {
                        borderColor: 'transparent',
                        backgroundColor: COLORS.base2,
                    },
                    inputContainerError: {
                        borderColor: COLORS.main5,
                    },
                    input: {
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body_Large,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body_Small_Regular,
                    },
                })
            );
    };
};

export default BaseTextInput;
