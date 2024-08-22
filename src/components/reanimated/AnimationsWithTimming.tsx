import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

type AnimatedWithTimmingProps = {
  duration?: number;
  easing?: (value: number) => number;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  style?: object;
  children?: React.ReactNode;
};

const AnimatedWithTimming: React.FC<AnimatedWithTimmingProps> = ({
  duration = 1000,
  easing = Easing.bezier(0.25, -0.5, 0.25, 1),
  distance = 100,
  direction = 'vertical',
  style = {},
  children = null,
}) => {
  const sv = useSharedValue<number>(0);

  React.useEffect(() => {
    sv.value = withTiming(1, { duration, easing });
  }, [duration, easing]);

  const animatedStyle = useAnimatedStyle(() => {
    const transform = direction === 'vertical'
      ? [{ translateY: sv.value * distance }]
      : [{ translateX: sv.value * distance }];
    return { transform };
  });

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedWithTimming;