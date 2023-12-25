import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  FriendScreen,
  HomeScreen,
  MenuScreen,
  NotificationsScreen,
  ProfileScreen,
  WatchScreen,
} from "../screens";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ModalContext } from "../hooks/useModalContext";
import { ModalPostComponent } from "../components";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../hooks/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route) || "Home";
  const isHomeScreen = routeName === "Home";
  const handleIconClick = () => {
    navigation.navigate("message");
  };
  const { isModalVisible, setModalVisible } = useContext(ModalContext);
  const coin = route.params.coin;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.headerContainer}>
        {isHomeScreen && (
          <View style={styles.header}>
            <Text style={styles.headerText}>Facebook</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <View style={styles.coinContainer}>
                <View style={styles.coinIcon}>
                  <FontAwesome5 name="coins" size={20} color="#f1cf2e" />
                </View>
                <Text style={styles.coinText}>{coin}</Text>
              </View>
              <TouchableOpacity onPress={handleIconClick}>
                <Ionicons name="chatbubble-ellipses" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "blue",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Friends"
          component={FriendScreen}
          options={() => ({
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={() => ({
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={() => ({
            tabBarBadge: () => (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "videocam" : "videocam-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={() => ({
            tabBarBadge: () => (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Menus"
          component={MenuScreen}
          options={() => ({
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "menu" : "menu-outline"}
                size={25}
                color={color}
              />
            ),
          })}
        />
      </Tab.Navigator>
      <ModalPostComponent isModalVisible={isModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    zIndex: 1,
    elevation: 1,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Heavy",
    color: "blue",
  },
  badgeContainer: {
    backgroundColor: "red",
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  coinContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  coinIcon: {
    marginRight: 20,
  },

  coinText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
export default TabNavigator;
