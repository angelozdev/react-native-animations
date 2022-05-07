import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Animated, {
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
const FIGURE_SIZE = width * 0.6;

export default function WordPage(props: Props) {
  const { bg, word, translateX, index } = props;

  const figureAnimatedStyles = useAnimatedStyle(() => {
    // 0 -> 0 1 0
    // 300  ->
    const scale = interpolate(translateX.value, [0, width, 0], [1, 0.8, 1]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View style={[styles.figure, figureAnimatedStyles]}>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
});
