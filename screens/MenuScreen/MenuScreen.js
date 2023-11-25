import React, { useState } from "react";
import { SafeAreaView, TextInput } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShortcutMenu } from "../../components";

const MenuScreen = () => {
  const [showAllShortCuts, setShowAllShortCuts] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");

  // handle search text into searchbar
  const handleSearchPress = () => {
    if (typeof searchText === "string" && searchText.trim() === "") {
      setShowSearchBar(!showSearchBar);
    }
  };
  const Separator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 500,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          Menu
        </Text>
        {/* searchbar */}
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder="Search..."
              style={styles.searchBar}
              // Debbuging Log
              // onChangeText={(text) => {
              //   // setSearchText(text)
              //   console.log("Input type:", typeof text);
              //   setSearchText(text);
              // }}
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.searchButton}
          // onPress={() => setShowSearchBar(!showSearchBar)}
          onPress={handleSearchPress}
        >
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.text}>
        <Text style={{ fontWeight: 500, fontSize: 20, color: "#A9A9A9" }}>
          All Shortcut
        </Text>
      </View>
      {/* shortcut section */}
      <View style={styles.shortcutMenu}>
        <TouchableOpacity>
          <ShortcutMenu iconName="briefcase-outline" label="Jobs" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="earth-outline" label="Marketplace" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="person-add-outline" label="Friends" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="calendar-outline" label="Events" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="game-controller-outline" label="Gaming" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="rainy-outline" label="Weather" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu iconName="bookmark-outline" label="Saved" />
        </TouchableOpacity>
        {!showAllShortCuts && (
          <TouchableOpacity onPress={() => setShowAllShortCuts(true)}>
            <ShortcutMenu iconName="" label="See more" />
          </TouchableOpacity>
        )}
        {showAllShortCuts && (
          <View>
            {/* Add more shortcut */}
            <TouchableOpacity>
              <ShortcutMenu iconName="heart-outline" label="Date" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShortcutMenu iconName="people-outline" label="Group" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShortcutMenu iconName="stopwatch-outline" label="Memories" />
            </TouchableOpacity>
            {/* See less button */}
            <TouchableOpacity onPress={() => setShowAllShortCuts(false)}>
              <ShortcutMenu iconName="" label="See less" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.separator1}>
        <Separator />
      </View>
      {/* menu footer */}
      <View style={styles.footer}>
        <View>
          <TouchableOpacity>
            <ShortcutMenu iconName="build-outline" label="Help & Support" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <ShortcutMenu
              iconName="settings-outline"
              label="Settings & Privacy"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  text: { paddingLeft: 15 },
  searchButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  shortcutMenu: {
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 2,
    width: 350,
    backgroundColor: "#5F6F52",
    borderRadius: 5,
  },
  separator1: {
    alignItems: "center",
    justifyContent: "center",
    top: 25,
  },
  footer: {
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    backgroundColor: "#F0F0F0",
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    width: 200,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default MenuScreen;
