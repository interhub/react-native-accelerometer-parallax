import React, {useContext, useEffect} from 'react'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {Accelerometer} from 'expo-sensors'
import {Platform} from 'react-native'

const AccelerometerContext = React.createContext<{ posX: Animated.SharedValue<number>, posY: Animated.SharedValue<number> }>({} as any)

const IS_IOS = Platform.OS === 'ios'
const INVERT_INDEX = IS_IOS ? -1 : 1
const PERIOD = 30

export const ParallaxProvider = ({children}: { children: React.ReactNode }) => {

    const fixedRound = (num: number) => {
        const DEC = 1
        'worklet'
        return parseFloat(Number(num || 0).toFixed(DEC))
    }

    const [posX, posY] = [useSharedValue(0), useSharedValue(0)]

    const setUpNewPos = ({x, y}: { x: number, y: number }) => {
        'worklet'
        const DEFAULT_SPEED = 200
        const newX = fixedRound(x * DEFAULT_SPEED)
        const newY = fixedRound(y * DEFAULT_SPEED)
        const config: Animated.WithTimingConfig = {duration: 500, easing: Easing.linear}
        posX.value = withTiming(-newX, config)
        posY.value = withTiming(newY, config)
    }

    useEffect(() => {
        Accelerometer.setUpdateInterval(PERIOD)

        const sub = Accelerometer.addListener(({x, y}) => {
            'worklet'
            setUpNewPos({x: x * INVERT_INDEX, y: y * INVERT_INDEX})
        })
        return () => {
            sub.remove()
        }
    }, [])

    return <AccelerometerContext.Provider value={{posX, posY}}>
        {children}
    </AccelerometerContext.Provider>
}

export type ParallaxConfig = {
    sensitivity?: number
}

export type ParallaxObject = {
    animStyle: ReturnType<typeof useAnimatedStyle>,
    posY: Animated.SharedValue<number>,
    posX: Animated.SharedValue<number>,
}


export const useParallax = (config?: ParallaxConfig): ParallaxObject => {
    const sensitivity = config?.sensitivity || 1
    const {posY, posX} = useContext(AccelerometerContext)

    const animStyle = useAnimatedStyle(() => {
        const getSensitivity = (value: number) => {
            'worklet'
            return (value * sensitivity) || 0
        }
        return {
            transform: [{translateY: getSensitivity(posY.value)}, {translateX: getSensitivity(posX.value)}]
        }
    })

    return {animStyle, posX, posY}
}
