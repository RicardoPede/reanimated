import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

type AnimatedComponentProps = {
  duration?: number;
  easing?: (value: number) => number;
  style?: any;
  children?: React.ReactNode;
};

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  duration = 20000,
  easing = Easing.bezier(0.25, -0.5, 0.25, 1),
  style = {},
  children = null,
}) => {
  const sv = useSharedValue<number>(0);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, [duration, easing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${sv.value * 360}deg` },
      { translateX: 0 },
      { translateY: 0 },
    ],
  }));

  return (
    <View style={style}>
      <Animated.View style={[animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedComponent;