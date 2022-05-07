import { View, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import WordPage from "./word-page";

const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export default function UsingScrollView() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      horizontal
      pagingEnabled
      style={styles.container}
    >
      {words.map((word, index) => (
        <WordPage
          key={index}
          index={index}
          word={word}
          translateX={translateX}
          bg={`rgba(140,20,252,0.${index + 1})`}
        />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
