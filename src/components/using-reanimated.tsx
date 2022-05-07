import { View, Button, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

export default function UsingReanimated() {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: scale.value },
        { rotate: `${progress.value * 2 * Math.PI}rad` },
      ],
      borderRadius: progress.value * (SQUARE_SIZE / 2),
      opacity: progress.value,
    }),
    []
  );

  const handlePress = React.useCallback(() => {
    scale.value = withRepeat(withSpring(1.5), 2, true);
    progress.value = withRepeat(withSpring(1), 2, true);
  }, []);

  React.useEffect(() => {
    handlePress();
  }, []);

  return (
    <View>
      <Animated.View style={[styles.square, animatedStyle]} />
      <Button onPress={handlePress} title="Press me" />
    </View>
  );
}

const SQUARE_SIZE = 100;
const styles = StyleSheet.create({
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: "purple",
    marginBottom: 50,
  },
});
