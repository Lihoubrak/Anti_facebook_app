import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require("../../assets/images/FacebookLogo.png")} />
      </View>
      <View style={styles.metalogo}>
        <Image source={require("../../assets/images/MetaLogo.png")} />
      </View>
      <View style={styles.lineblack}></View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  metalogo: {
    marginTop: 300,
  },
  lineblack: {
    marginTop: 35,
    width: 134,
    height: 5,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.black,
  },
});
