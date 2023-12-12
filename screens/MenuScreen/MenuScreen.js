import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const initialMenuItems = [
  { icon: "ios-people", name: "Groups" },
  { icon: "ios-person", name: "Friends" },
  { icon: "clipboard", name: "Feeds" },
  { icon: "calendar", name: "Events" },
  { icon: "clipboard", name: "Feeds" },
  { icon: "game-controller", name: "Gaming" },
  { icon: "bookmark", name: "Saved" },
  { icon: "ios-videocam", name: "Video" },
];

const additionalMenuItems = [
  { icon: "stopwatch", name: "Memories" },
  { icon: "ios-heart", name: "Dating" },
];

const MenuItem = ({ icon, name }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (name === "Friends") {
      navigation.navigate("Friends");
    }
    // ==========
    if (name === "Video") {
      navigation.navigate("Watch");
    }
    if (name === "Feeds") {
      navigation.navigate("Home");
    }
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPressHandler}>
      <Ionicons name={icon} size={30} color="#FFFFFF" />
      <Text style={styles.menuItemText}>{name}</Text>
    </TouchableOpacity>
  );
};

const MenuScreen = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [seeMore, setSeeMore] = useState(false);
  const navigation = useNavigation();

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const combinedMenuItems = seeMore
    ? [...initialMenuItems, ...additionalMenuItems]
    : initialMenuItems;

  const handlePress = (name) => {
    switch (name) {
      case "Help":
        break;
      case "Settings":
        break;
      case "Logout":
        break;
      default:
        navigation.navigate(name);
    }
  };

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
        <Text style={styles.seeMoreText}>
          {seeMore ? "See Less" : "See More"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => handlePress("Help")}
      >
        <Ionicons name="help-circle" color="white" size={24} />
        <Text style={styles.footerButtonText}>Help and Support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => handlePress("Settings")}
      >
        <Ionicons name="cog" color="white" size={24} />
        <Text style={styles.footerButtonText}>Settings and Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => handlePress("Logout")}
      >
        <Ionicons name="log-out" color="white" size={24} />
        <Text style={styles.footerButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <View style={styles.shortcut}>
          <Text style={styles.shortcutText}>All Shortcut</Text>
        </View>
        <FlatList
          data={combinedMenuItems}
          renderItem={({ item }) => (
            <MenuItem
              icon={item.icon}
              name={item.name}
              onPress={() => handlePress(item.name)}
            />
          )}
          keyExtractor={(item) => item.name}
          numColumns={2}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
  },
  shortcut: {
    left: 10,
  },
  shortcutText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#A8AAB3",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  menuItem: {
    backgroundColor: "#6B6C6D",
    borderRadius: 10,
    padding: 7,
    margin: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
  seeMoreButton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#385376",
    borderRadius: 10,
    width: "95%",
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
  },
  footerButton: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: 50,

    marginTop: 10,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    left: 10,
  },
});

export default MenuScreen;
