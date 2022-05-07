import { View, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import WordPage from "./word-page";

const words = [
  "Hello",
  "World",
  "React Native",
  "Reanimated",
  "And",
  "Gestures",
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
      {words.map((word, index) => {
        const MIN_OPACITY = 0.4;
        const MAX_OPACITY = 1;
        const currentOpacity =
          (index / words.length) * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY;

        return (
          <WordPage
            key={index}
            index={index}
            word={word}
            translateX={translateX}
            bg={`rgba(140,0,152,${currentOpacity})`}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
