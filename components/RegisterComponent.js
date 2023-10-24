import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import ButtonComponent from "./ButtonComponent";

const RegisterComponent = ({
  title,
  children,
  subtitle,
  titleBtn,
  isFindAccount,
  searchByText,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.inputRow}>{children}</View>
        <ButtonComponent title={titleBtn} />
        {isFindAccount && (
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "blue",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {searchByText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 30,
  },
  header: {
    marginTop: 80,
    marginBottom: 50,
    gap: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.dark,
    textAlign: "center",
    width: "80%",
  },
  inputRow: {
    marginBottom: 20,
    flexDirection: "row",
  },
});

export default RegisterComponent;
