import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  UsingPanGestures,
  UsingReactNativeApi,
  UsingReanimated,
  UsingScrollView,
  UsingInterpolateColor,
} from "./src/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <UsingReactNativeApi /> */}
      {/* <UsingReanimated /> */}
      {/* <UsingPanGestures /> */}
      {/* <UsingScrollView /> */}
      <UsingInterpolateColor />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
