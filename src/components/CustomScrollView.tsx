import React, { useState, FC, useRef, ReactNode } from 'react';

import { View, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import COLORS from '../styles/colors';
import scale from '../styles/scale';

type Props = {
    children: ReactNode;
};

const CustomScrollView: FC<Props> = (props) => {
    const {
        children,
    } = props;

    const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorHeight, setIndicatorHeight] = useState<number>(scale(60));
    const [indicatorVisible, setIndicatorVisible] = useState<boolean>(false);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;

        if (!indicatorVisible) {
            setIndicatorVisible(true);
        }

        let newIndicatorHeight = scale(60);

        if (contentHeight > scrollViewHeight) {
            newIndicatorHeight = (scrollViewHeight / contentHeight) * containerHeight;
            newIndicatorHeight = Math.max(newIndicatorHeight, scale(40));
        } else {
            newIndicatorHeight = containerHeight;
        }

        setIndicatorHeight(newIndicatorHeight);

        if (contentHeight > scrollViewHeight) {
            const maxScroll = contentHeight - scrollViewHeight;
            const maxIndicatorMove = containerHeight - newIndicatorHeight;

            const scrollPercentage = maxScroll > 0 ? contentOffset.y / maxScroll : 0;
            const newIndicatorPosition = scrollPercentage * maxIndicatorMove;

            setIndicatorPosition(newIndicatorPosition);
        }

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            setIndicatorVisible(false);
        }, 200);
    };

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                const { height } = event.nativeEvent.layout;

                setContainerHeight(height - scale(16) - scale(16));
            }}
        >
            <ScrollView
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onLayout={(event) => {
                    setScrollViewHeight(event.nativeEvent.layout.height);
                }}
                onContentSizeChange={(_, height) => {
                    setContentHeight(height);
                }}
            >
                {children}
            </ScrollView>


            {
                indicatorVisible && (
                    <View style={styles.scrollIndicatorContainer}>
                        <View
                            style={[
                                styles.scrollIndicator,
                                {
                                    transform: [{ translateY: indicatorPosition }],
                                    height: indicatorHeight,
                                },
                            ]}
                        />
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    scrollView: {
        flex: 1,
    },
    scrollIndicatorContainer: {
        width: scale(2),
        borderRadius: 5,
        position: 'absolute',
        left: scale(16),
        top: scale(16),
        bottom: scale(16),
        backgroundColor: COLORS.base2,
    },
    scrollIndicator: {
        width: scale(2),
        backgroundColor: COLORS.main4,
    },
});

export default CustomScrollView;
