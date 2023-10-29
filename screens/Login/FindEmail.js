import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ButtonComponent,
  InputTextComponent,
  RegisterComponent,
} from "../../components";

const FindEmail = () => {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const clearEmail = () => {
    setEmail("");
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  return (
    <RegisterComponent
      title={"Enter your email address"}
      titleBtn={"Find Your Account"}
      isFindAccount={true}
      searchByText={"Search by number instead"}
    >
      <InputTextComponent
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        isFocused={isEmailFocused}
        clear={email.length > 0}
        iconName="close-circle"
        InputFunction={clearEmail}
        onFocus={handleEmailFocus}
        isFlex={true}
        secureTextEntry={false}
      />
    </RegisterComponent>
  );
};

export default FindEmail;

const styles = StyleSheet.create({});
