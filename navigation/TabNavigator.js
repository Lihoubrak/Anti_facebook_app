import React from "react";
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
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route) || "Home";
  const isHomeScreen = routeName === "Home";
  const handleIconClick = () => {
    navigation.navigate("message");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerContainer}>
        {isHomeScreen && (
          <View style={styles.header}>
            <Text style={styles.headerText}>Facebook</Text>
            <TouchableOpacity onPress={handleIconClick}>
              <Ionicons name="chatbubble-ellipses" size={24} color="blue" />
            </TouchableOpacity>
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
          name="Watchs"
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
    </SafeAreaView>
  );
};

const styles = {
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
};

export default TabNavigator;
