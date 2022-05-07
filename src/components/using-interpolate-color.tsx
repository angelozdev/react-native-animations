import { View, Switch, StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CIRCLE_RADIUS = (width * 0.6) / 2;

const theme = {
  light: {
    bg: "#f3f3f3",
    circleBg: "#f3f3f3",
    text: "rgb(30, 30, 30)",
  },
  dark: {
    bg: "rgb(30,30,30)",
    circleBg: "rgb(35,35,35)",
    text: "#f3f3f3",
  },
};

export default function UsingInterpolateColor() {
  const [isDarkModeActive, setIsDarkModeActive] = React.useState(false);

  const progress = useDerivedValue(() => {
    if (isDarkModeActive) return withSpring(1);
    return withSpring(0);
  }, [isDarkModeActive]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.light.bg, theme.dark.bg]
    );
    return { backgroundColor };
  }, []);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.light.circleBg, theme.dark.circleBg]
    );
    return { backgroundColor };
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [theme.light.text, theme.dark.text]
    );
    return { color };
  }, []);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <View style={styles.header}>
        <Animated.Text style={[styles.title, textAnimatedStyle]}>
          Theme
        </Animated.Text>
        <Animated.Text style={[styles.text, textAnimatedStyle]}>
          {isDarkModeActive ? "Dark" : "Light"}
        </Animated.Text>
      </View>
      <View style={styles.circleShadow}>
        <Animated.View style={[styles.circle, circleAnimatedStyle]}>
          <Switch
            value={isDarkModeActive}
            onValueChange={setIsDarkModeActive}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    justifyContent: "center",
    alignItems: "center",
  },
  circleShadow: {
    backgroundColor: "transparent",
    borderRadius: CIRCLE_RADIUS,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 50,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 5,
  },
  text: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
});
