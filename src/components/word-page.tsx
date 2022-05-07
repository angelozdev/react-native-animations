import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  bg: string;
  word: string;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const { height, width } = Dimensions.get("window");
const FIGURE_SIZE = width * 0.7;

export default function WordPage(props: Props) {
  const { bg, word, translateX, index } = props;
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const figureAnimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, FIGURE_SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  }, []);

  const wordContainerAnimatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-height / 2, 0, height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View style={[styles.figure, figureAnimatedStyles]} />
      <Animated.View
        style={[styles.wordContainer, wordContainerAnimatedStyles]}
      >
        <Text style={styles.word}>{word}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  figure: {
    width: FIGURE_SIZE,
    height: FIGURE_SIZE,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  wordContainer: {
    position: "absolute",
  },
});
