import React, { FC, useState } from 'react';

import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native';

import Icon, { IconType } from './Icon';

import SPACING from '../styles/spacing';
import COLORS from '../styles/colors';
import TYPOGRAPHY from '../styles/typography';
import scale from '../styles/scale';

type Props = {
    size?: 'medium' | 'small' | 'xsmall';
    disabled?: boolean;
    error?: string;
    value: string;
    placeholder?: string;
    label?: string;
    caption?: string;
    leftIcon?: IconType;
    rightIcon?: IconType;
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
        caption,
        leftIcon,
        rightIcon,
        onChangeText,
    } = props;

    const styles = createStyles(size);

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
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
                                fill={disabled ? COLORS.main9 : COLORS.main3}
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
                                fill={disabled ? COLORS.main9 : COLORS.main3}
                            />
                        </Pressable>
                    )
                }
            </View>

            {
                error && !disabled
                ? <Text style={styles.errorText}>{error}</Text>
                : caption
                ? <Text style={styles.caption}>{caption}</Text>
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
                        ...TYPOGRAPHY.f11_Body,
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
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body,
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
                        ...TYPOGRAPHY.f11_Body,
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
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body,
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
                        ...TYPOGRAPHY.f11_Body,
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
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        color: COLORS.main1,
                        ...TYPOGRAPHY.f9_Body,
                    },
                    rightIconContainer: {
                        marginLeft: SPACING.sm,
                    },
                    caption: {
                        marginTop: SPACING.sm,
                        color: COLORS.main2,
                        ...TYPOGRAPHY.f13_Body,
                    },
                    errorText: {
                        marginTop: SPACING.sm,
                        color: COLORS.main5,
                        ...TYPOGRAPHY.f13_Body,
                    },
                })
            );
    }
};

export default BaseTextInput;
