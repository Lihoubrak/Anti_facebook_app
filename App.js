import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Define the main App component
const App = () => {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    Medium: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    Semibold: require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    Bold: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    Light: require("./assets/fonts/SF-Pro-Text-Light.otf"),
    Heavy: require("./assets/fonts/SF-Pro-Text-Heavy.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return a loading screen or any other component while fonts are loading.
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: "Light" }}>Hello</Text>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
