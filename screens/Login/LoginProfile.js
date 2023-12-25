import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { ButtonComponent } from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const LoginProfile = () => {
  const navigation = useNavigation();
  const handleCreateAccountClick = () => {
    navigation.navigate("Register");
  };

  const handleLoginProfileClick = () => {
    navigation.navigate("login");
  };

  const handleFindAccountClick = () => {
    navigation.navigate("findemail");
  };
  const refreshLoginScreen = useCallback(() => {}, []);
  useFocusEffect(refreshLoginScreen);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/Logo.png")}
        />
        <View>
          <View style={styles.userContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImage}
                source={require("../../assets/images/ProfileImage.png")}
              />
              <Text style={styles.username}>Sanjay Shendy</Text>
            </View>
            <Ionicons name="md-ellipsis-vertical" size={24} color="black" />
          </View>
          <View style={styles.accountOptions}>
            <TouchableOpacity
              onPress={handleLoginProfileClick}
              style={styles.optionItem}
            >
              <Ionicons name="md-log-in" size={24} color="blue" />
              <Text style={styles.optionText}>Log into Another Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFindAccountClick}
              style={styles.optionItem}
            >
              <Ionicons name="md-search" size={24} color="blue" />
              <Text style={styles.optionText}>Find Your Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ButtonComponent
            onPress={handleCreateAccountClick}
            title={"Create New Facebook Account"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "space-around",
  },
  logo: {
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 65,
    height: 75,
    borderRadius: SIZES.medium,
  },
  username: {
    fontSize: 18,
    paddingLeft: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountOptions: {
    marginTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.blue,
  },
});
