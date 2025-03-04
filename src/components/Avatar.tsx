import React, { FC } from 'react';

import { Image, StyleSheet, View } from 'react-native';

import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    size?: 'big' | 'medium' | 'small' | 'xsmall';
    source?: { uri: string };
    isActive?: boolean;
};

const Avatar: FC<Props> = (props) => {
    const {
        size = 'big',
        source,
        isActive,
    } = props;

    const styles = createStyles(size);

    return (
        <View style={styles.container}>
            <Image
                source={source}
                style={styles.image}
            />

            {
                isActive && (
                    <View style={styles.indicatorContainer}>
                        <View style={styles.indicator} />
                    </View>
                )
            }
        </View>
    );
};

const createStyles = (size: 'big' | 'medium' | 'small' | 'xsmall') => {
    switch (size) {
        case ('big'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(80),
                        width: scale(80),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(80),
                    },
                    image: {
                        height: scale(80),
                        width: scale(80),
                        borderRadius: scale(80),
                    },
                    indicatorContainer: {
                        position: 'absolute',
                        top: scale(70),
                        left: scale(58),
                        height: scale(14),
                        width: scale(14),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(14),
                        backgroundColor: COLORS.base1,
                    },
                    indicator: {
                        height: scale(10),
                        width: scale(10),
                        borderRadius: scale(10),
                        backgroundColor: COLORS.main7,
                    },
                })
            );
        case ('medium'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(80),
                        width: scale(80),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(80),
                    },
                    image: {
                        height: scale(80),
                        width: scale(80),
                        borderRadius: scale(80),
                    },
                    indicatorContainer: {
                        position: 'absolute',
                        top: scale(70),
                        left: scale(58),
                        height: scale(14),
                        width: scale(14),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(14),
                        backgroundColor: COLORS.base1,
                    },
                    indicator: {
                        height: scale(10),
                        width: scale(10),
                        borderRadius: scale(10),
                        backgroundColor: COLORS.main7,
                    },
                })
            );
        case ('small'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(80),
                        width: scale(80),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(80),
                    },
                    image: {
                        height: scale(80),
                        width: scale(80),
                        borderRadius: scale(80),
                    },
                    indicatorContainer: {
                        position: 'absolute',
                        top: scale(70),
                        left: scale(58),
                        height: scale(14),
                        width: scale(14),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(14),
                        backgroundColor: COLORS.base1,
                    },
                    indicator: {
                        height: scale(10),
                        width: scale(10),
                        borderRadius: scale(10),
                        backgroundColor: COLORS.main7,
                    },
                })
            );
        case ('xsmall'):
            return (
                StyleSheet.create({
                    container: {
                        height: scale(80),
                        width: scale(80),
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(80),
                    },
                    image: {
                        height: scale(80),
                        width: scale(80),
                        borderRadius: scale(80),
                    },
                    indicatorContainer: {
                        position: 'absolute',
                        top: scale(70),
                        left: scale(58),
                        height: scale(14),
                        width: scale(14),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: scale(14),
                        backgroundColor: COLORS.base1,
                    },
                    indicator: {
                        height: scale(10),
                        width: scale(10),
                        borderRadius: scale(10),
                        backgroundColor: COLORS.main7,
                    },
                })
            );
    };
};

export default Avatar;
