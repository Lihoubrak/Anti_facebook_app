import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShortcutMenu } from "../../components";
import { useState } from "react";

const MenuScreen = () => {
  const [showAllShortCuts, setShowAllShortCuts] = useState(false);
  const Separator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontWeight: 600, fontSize: 30 }}>Menu</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
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
        <TouchableOpacity>
          <ShortcutMenu iconName="build-outline" label="Help & Support" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShortcutMenu
            iconName="settings-outline"
            label="Settings & Privacy"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  searchButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  container1: {
    paddingLeft: 15,
  },
  shortcutMenu: {
    flex: 1,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 25,
  },
  footer: {
    flex: 1,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MenuScreen;
