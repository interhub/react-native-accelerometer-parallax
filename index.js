"use strict";
exports.__esModule = true;
exports.useParallax = exports.ParallaxProvider = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var expo_sensors_1 = require("expo-sensors");
var react_native_1 = require("react-native");
var AccelerometerContext = react_1["default"].createContext({});
var IS_IOS = react_native_1.Platform.OS === 'ios';
var INVERT_INDEX = IS_IOS ? -1 : 1;
var PERIOD = 30;
exports.ParallaxProvider = function (_a) {
    var children = _a.children;
    var fixedRound = function (num) {
        var DEC = 1;
        'worklet';
        return parseFloat(Number(num || 0).toFixed(DEC));
    };
    var _b = [react_native_reanimated_1.useSharedValue(0), react_native_reanimated_1.useSharedValue(0)], posX = _b[0], posY = _b[1];
    var setUpNewPos = function (_a) {
        'worklet';
        var x = _a.x, y = _a.y;
        var DEFAULT_SPEED = 200;
        var newX = fixedRound(x * DEFAULT_SPEED);
        var newY = fixedRound(y * DEFAULT_SPEED);
        var config = { duration: 500, easing: react_native_reanimated_1.Easing.linear };
        posX.value = react_native_reanimated_1.withTiming(-newX, config);
        posY.value = react_native_reanimated_1.withTiming(newY, config);
    };
    react_1.useEffect(function () {
        expo_sensors_1.Accelerometer.setUpdateInterval(PERIOD);
        var sub = expo_sensors_1.Accelerometer.addListener(function (_a) {
            'worklet';
            var x = _a.x, y = _a.y;
            setUpNewPos({ x: x * INVERT_INDEX, y: y * INVERT_INDEX });
        });
        return function () {
            sub.remove();
        };
    }, []);
    return <AccelerometerContext.Provider value={{ posX: posX, posY: posY }}>
        {children}
    </AccelerometerContext.Provider>;
};
exports.useParallax = function (config) {
    var sensitivity = (config === null || config === void 0 ? void 0 : config.sensitivity) || 1;
    var _a = react_1.useContext(AccelerometerContext), posY = _a.posY, posX = _a.posX;
    var animStyle = react_native_reanimated_1.useAnimatedStyle(function () {
        var getSensitivity = function (value) {
            'worklet';
            return (value * sensitivity) || 0;
        };
        return {
            transform: [{ translateY: getSensitivity(posY.value) }, { translateX: getSensitivity(posX.value) }]
        };
    });
    return { animStyle: animStyle, posX: posX, posY: posY };
};
