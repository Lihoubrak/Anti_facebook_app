import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Splash_Screen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";

const App = () => {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    Medium: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    Semibold: require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    Bold: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    Light: require("./assets/fonts/SF-Pro-Text-Light.otf"),
    Heavy: require("./assets/fonts/SF-Pro-Text-Heavy.otf"),
  });
  const [userAuthenticated, setUserAuthenticated] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        await Splash_Screen.hideAsync();
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userAuthenticated ? "TabNavigator" : "AuthNavigator"}
        headerMode="none"
      >
        {userAuthenticated ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: true, headerBackTitle: "Back" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
