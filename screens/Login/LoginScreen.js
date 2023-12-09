import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { ButtonComponent, InputTextComponent } from "../../components";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const clearEmail = () => {
    setEmail("");
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../../assets/images/Rectangle1.png")}
        style={styles.backgroundImage}
      />
      <Image
        resizeMode="cover"
        source={require("../../assets/images/Rectangle2.png")}
        style={[styles.backgroundImage, { top: -10, left: 0 }]}
      />
      <Image
        resizeMode="cover"
        source={require("../../assets/images/Rectangle3.png")}
        style={[styles.backgroundImage, { top: 10, left: 0 }]}
      />
      <Image
        resizeMode="cover"
        source={require("../../assets/images/Rectangle4.png")}
        style={[styles.backgroundImage, { top: 40, left: 0 }]}
      />
      <View style={styles.contentContainer}>
        <Image
          resizeMode="cover"
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <InputTextComponent
            label="Phone or Email"
            value={email}
            onChangeText={setEmail}
            isFocused={emailFocused}
            clear={email !== ""}
            InputFunction={clearEmail}
            onFocus={handleEmailFocus}
            iconName="ios-close"
          />
          <InputTextComponent
            label="Password"
            value={password}
            onChangeText={setPassword}
            isFocused={passwordFocused}
            onFocus={handlePasswordFocus}
            InputFunction={togglePasswordVisibility}
            iconName={showPassword ? "eye-outline" : "eye-off-outline"}
            secureTextEntry={!showPassword}
          />
          <ButtonComponent title={"Log In"} />

          <TouchableOpacity onPress={() => navigation.navigate("findphone")}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.createAccountButtonText}>
              Create new Facebook account
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {},
  inputContainer: {
    width: "100%",
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
  createAccountButton: {
    padding: 10,
    borderRadius: SIZES.large,
    borderColor: "blue",
    borderWidth: 2,
    marginTop: 15,
    alignItems: "center",
    fontSize: 18,
  },
  createAccountButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
