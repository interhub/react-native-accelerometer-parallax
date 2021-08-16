import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
export declare const ParallaxProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export declare type ParallaxConfig = {
    sensitivity?: number;
};
export declare type ParallaxObject = {
    animStyle: ReturnType<typeof useAnimatedStyle>;
    posY: Animated.SharedValue<number>;
    posX: Animated.SharedValue<number>;
};
export declare const useParallax: (config?: ParallaxConfig) => ParallaxObject;
