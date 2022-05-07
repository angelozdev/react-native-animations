import { View, StyleSheet, Text } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TPanGestureHandlerContext = {
  translateX: number;
  translateY: number;
};

export default function UsingPanGestures() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [isInside, setIsInside] = React.useState(true);

  const eventGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    TPanGestureHandlerContext
  >({
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
    },
    onStart: (event, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SQUARE_SIZE / 2) {
        runOnJS(setIsInside)(true);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        runOnJS(setIsInside)(false);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }),
    []
  );

  return (
    <View>
      <View
        style={[
          styles.circle,
          { backgroundColor: isInside ? "transparent" : "#9c27b044" },
        ]}
      >
        <PanGestureHandler onGestureEvent={eventGesture}>
          <Animated.View style={[styles.square, animatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const SQUARE_SIZE = 100;
const CIRCLE_RADIUS = 100;
const styles = StyleSheet.create({
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: "purple",
    borderRadius: SQUARE_SIZE / 6,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 4,
    borderColor: "purple",
  },
});
