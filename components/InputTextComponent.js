import React from "react";
import { Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const InputTextComponent = ({
  label,
  value,
  onChangeText,
  isFocused,
  clear,
  iconName,
  InputFunction,
  onFocus,
  isFlex,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputWrapper(isFlex)}>
      <Text
        style={[styles.label, { color: isFocused ? COLORS.blue : COLORS.dark }]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderBottomColor: isFocused ? COLORS.blue : COLORS.dark },
        ]}
        onFocus={onFocus}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {value !== "" && (
        <Ionicons
          name={iconName}
          size={20}
          color={COLORS.dark}
          style={styles.clearIcon}
          onPress={InputFunction}
        />
      )}
    </View>
  );
};

const styles = {
  inputWrapper: (isFlex) => ({
    position: "relative",
    marginBottom: 10,
    padding: 10,
    flex: isFlex ? 1 : 0,
  }),
  label: {
    fontSize: 16,
    color: COLORS.dark,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingRight: 15,
  },
  clearIcon: {
    position: "absolute",
    right: 5,
    top: 40,
  },
};

export default InputTextComponent;
