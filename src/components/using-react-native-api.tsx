import React from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function UsingReactNaviteApi() {
  const { current: progress } = React.useRef(new Animated.Value(0.5));
  const { current: scale } = React.useRef(new Animated.Value(1));

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(progress, {
            toValue: 0.5,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.3,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {
        iterations: 5,
      }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            opacity: progress,
            transform: [
              { scale },
              {
                rotate: progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: ["0rad", Math.PI + "rad"],
                }),
              },
            ],
            borderRadius: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 4, SIZE / 2],
            }),
          },
        ]}
      />
    </View>
  );
}

const SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "brown",
  },
});
