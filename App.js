import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import StudentInfo from "./screens/StudentInfo";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginHTPPS from "./screens/LoginHTPPS";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ExerciseScreen">
        <Stack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="1"
          component={StudentInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="2"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="3"
          component={LoginHTPPS}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
