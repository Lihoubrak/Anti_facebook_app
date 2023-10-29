import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { InputTextComponent, RegisterComponent } from "../../components";

const AccountPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const clearPassword = () => {
    setPassword("");
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  return (
    <RegisterComponent
      title={"Choose a password"}
      subtitle={
        "Create a password with at least 6 characters. It should be something others couldn't guess."
      }
    >
      <InputTextComponent
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        isFocused={passwordFocused}
        clear={password !== ""}
        clearFunction={clearPassword}
        onFocus={handlePasswordFocus}
      />
    </RegisterComponent>
  );
};

const styles = StyleSheet.create({});

export default AccountPassword;
