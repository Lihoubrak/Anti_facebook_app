import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/images/Illustration.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Join Facebook</Text>
          <Text style={styles.subtitle}>
            We'll help you create a new account in a few easy steps
          </Text>
        </View>
        <ButtonComponent title={"Next"} onPress={handleNextClick} />
        <View style={styles.haveAccountContainer}>
          <TouchableOpacity>
            <Text style={styles.alreadyhaveAccountText}>
              Already have an account?
            </Text>
          </TouchableOpacity>
          <View style={styles.lineBlack}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const handleNextClick = () => {
  // Handle the click event for the "Next" button
  console.log("Next button clicked");
  // Add your custom logic here
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  contentContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  image: {},
  textContainer: {
    marginTop: 80,
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: "center",
  },
  haveAccountContainer: {
    marginTop: 150,
    alignItems: "center",
  },
  lineBlack: {
    marginTop: 10,
    width: 134,
    height: 5,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.black,
  },
  alreadyhaveAccountText: {
    marginBottom: 10,
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: "bold",
  },
});
