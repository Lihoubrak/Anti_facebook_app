import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, InputTextComponent } from "../../components"; // Make sure these imports are correct
import { Ionicons } from "@expo/vector-icons";

const OTPCode = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isOtpFocused, setIsOtpFocused] = useState(false);

  const handleOtpChange = (text) => {
    setOtpValue(text);
  };

  const clearOtpInput = () => {
    setOtpValue("");
  };

  const handleOtpFocus = () => {
    setIsOtpFocused(true);
  };

  const handleOtpBlur = () => {
    setIsOtpFocused(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Enter the code we sent to</Text>
        <Text style={styles.email}>blh.braklihou123@gmail.com</Text>
        <Text style={styles.description}>
          We sent a 6-digit code to your email address
        </Text>
      </View>

      <InputTextComponent
        label="OTP Code"
        value={otpValue}
        onChangeText={handleOtpChange}
        isFocused={isOtpFocused}
        iconName="ios-close"
        InputFunction={clearOtpInput}
        onFocus={handleOtpFocus}
        isFlex={true}
        secureTextEntry={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resendButton}>
          <Ionicons name="refresh" style={styles.icon} />
          <Text style={styles.buttonText}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changeEmailButton}>
          <Ionicons name="mail" style={styles.icon} />
          <Text style={styles.buttonText}>Change Email</Text>
        </TouchableOpacity>
      </View>
      <ButtonComponent title={"Continue"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 20,
  },
  centerContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeEmailButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default OTPCode;
