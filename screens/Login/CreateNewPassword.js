import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { InputTextComponent, RegisterComponent } from "../../components";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const clearPasswordInput = () => {
    setPassword("");
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  return (
    <RegisterComponent
      title={"Create new Password"}
      subtitle={
        "You will use this password to access your account. Enter a combination of at least six numbers, letters, and punctuation marks."
      }
      titleBtn={"Login"}
    >
      <InputTextComponent
        isFlex={true}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={handlePasswordChange}
        isFocused={isPasswordFocused}
        clear={clearPasswordInput}
        iconName="ios-close"
        InputFunction={clearPasswordInput}
        onFocus={handlePasswordFocus}
      />
    </RegisterComponent>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({});
