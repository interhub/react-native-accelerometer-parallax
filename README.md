# React Native Accelerometer Parallax 🍻

### Simple Accelerometer animation react-native library for animate translateXY some View RN for IOS and Android 🍎 🤖

## That now Library is supporting and work ⚙️

Library stand by expo-sensors and react-native-reanimated. TS only.

[video example source link 🪐]( https://interhub.github.io/source/parallax-lib.gif )

![video example not loads 🤖]( https://interhub.github.io/source/parallax-lib.gif  )

[repository code example from video*](https://github.com/interhub/rn-examples/tree/master/examples/AccelerometerLib)

# Install

1. Install last version [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) (v2.0.0
   or more)

2. Install last version [expo-sensors](https://docs.expo.io/versions/latest/sdk/sensors)

3. Install library

> yarn add react-native-accelerometer-parallax

# Usage

### 1. Wrap your root App.tsx to ParallaxProvider to provide context value for hooks.

```tsx
import React from 'react'
import {ParallaxProvider} from 'react-native-accelerometer-parallax'

const App = () => {
    return <ParallaxProvider>
        <SomeStack/> 
    </ParallaxProvider>
}

export default App

```

### 2. Get context value to use animated value (hook shared value from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated))

```tsx
import {useParallax} from 'react-native-accelerometer-parallax'


const Screen = () => {
    const {animStyle} = useParallax()

    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Parallax text test</Text>
    </View>
}

```

### 3. Wrap your some component to Animated.View from [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and pass animated style to style prop

```tsx 
import React from 'react'
import {useParallax} from 'react-native-accelerometer-parallax'
import Animated from 'react-native-reanimated'
import {View, Text} from 'react-native'
import {ParallaxProvider} from 'react-native-accelerometer-parallax'

const Screen = () => {
   const {animStyle} = useParallax()
   return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={animStyle}>
         <Text>Parallax text test</Text>
      </Animated.View>
   </View>
}

const App = () => {
   return <ParallaxProvider>
      <Screen/>
   </ParallaxProvider>
}

export default App

```

### 4. Final - ✨📲 Look at work view motion!

# Documentation.

### 1. useParallax(config: **ParallaxConfig**): **ParallaxObject**

**ParallaxConfig**

- sensitivity: number - (default 1, sensitivity accelerometer rotate and multiple to animate shared value )

**ParallaxObject**

- animStyle: {transform:[{translateX: number},{translateY: number}]} (for pass to Animated.View style prop)

- posX: Animated.SharedValue<number> (for use it or interpolate, for example style={{opacity: posY.value}})

- posY: Animated.SharedValue<number> (equal posX)


#Contact

✨Lib going to grow up, and you can send your questions and offers to my telegram [Stepan_Turchenko](https://telegram.me/Stepan_Turchenko) 🛬
