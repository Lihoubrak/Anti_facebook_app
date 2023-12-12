import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Splash_Screen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";
import {
  MessageChat,
  MessageProfile,
  MessageScreen,
  NewMessage,
} from "./screens";

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
        screenOptions={{ headerShown: false }}
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
        <Stack.Screen
          name="message"
          component={MessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="newMessage"
          component={NewMessage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat"
          component={MessageChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chatproflie"
          component={MessageProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
