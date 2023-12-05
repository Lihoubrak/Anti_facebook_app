import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
} from "react-native";
import notificationsData from "../../data/notificationdata";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ActionSheetIOS } from "react-native";

const NotificationItem = ({ type, content, time, profileImage, read }) => {
  const getIconName = () => {
    switch (type) {
      case "video":
        return "videocam";
      case "post":
        return "image";
      case "share":
        return "paper-plane";
      default:
        return "megaphone-outline";
    }
  };
  return (
    <View style={styles.notificationItem}>
      <Image source={profileImage} style={styles.profileImage} />
      <Ionicons
        name={getIconName()}
        size={24}
        color="#4F8EF7"
        style={styles.iconStyle}
      />
      <View style={styles.notificationTextContainer}>
        <Text
          style={[styles.notificationContent, read ? styles.textRead : null]}
        >
          {content}
        </Text>
        <Text style={[styles.notificationTime, read ? styles.textRead : null]}>
          {time}
        </Text>
      </View>
    </View>
  );
};

const Header = ({ onSearchToggle, isSearchActive, onSettingsPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <View style={styles.headerRight}>
        {isSearchActive && (
          <TextInput
            style={styles.searchInput}
            autoFocus
            placeholder="Search..."
            placeholderTextColor="#aaa"
          />
        )}
        <TouchableOpacity onPress={onSearchToggle} style={styles.iconButton}>
          <Ionicons name="ios-search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
          <Ionicons name="ios-settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NotificationsScreen = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };
  const handleSettingsPress = () => {
    // ActionSheetIOS.showActionSheetWithOptions(
    //   {
    //     options: ["Cancel", "Mark All as Read"],
    //     destructiveButtonIndex: 1,
    //     cancelButtonIndex: 0,
    //   },
    //   (buttonIndex) => {
    //     if (buttonIndex === 1) {
    //       markAllAsRead();
    //     }
    //   }
    // );
    setModalVisible(true);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onSearchToggle={handleSearchToggle}
        isSearchActive={isSearchActive}
        onSettingsPress={handleSettingsPress}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem {...item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
            <Button title="Mark all as read" onPress={markAllAsRead} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  notificationTextContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  notificationContent: {
    color: "#000000",
    fontSize: 16,
  },
  notificationTime: {
    color: "#aaa",
    fontSize: 14,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#315B8E",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 10,
    paddingLeft: 10,
    width: 180,
    height: 40,
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  notificationRead: {
    backgroundColor: "#EDF2F8",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textRead: {
    color: "grey",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#007aff",
  },
});
export default NotificationsScreen;
