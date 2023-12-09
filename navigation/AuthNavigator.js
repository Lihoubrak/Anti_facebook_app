import { createStackNavigator } from "@react-navigation/stack";
import {
  AccountBirthDay,
  AccountGender,
  AccountName,
  AccountNumber,
  AccountPassword,
  AccountTermsPrivacy,
  Register,
  SplashScreen,
  CreateNewPassword,
  FindPhone,
  LoginProfile,
  LoginScreen,
  OTPCode,
  FindEmail,
} from "../screens";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="start"
        component={SplashScreen}
        options={{ headerShown: false }}
        initialRouteName="Home"
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="name"
        component={AccountName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="birthday"
        component={AccountBirthDay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="gender"
        component={AccountGender}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="number"
        component={AccountNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="password"
        component={AccountPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="terms"
        component={AccountTermsPrivacy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="findphone"
        component={FindPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="findemail"
        component={FindEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginproflie"
        component={LoginProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otpcode"
        component={OTPCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="createnewpassword"
        component={CreateNewPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
