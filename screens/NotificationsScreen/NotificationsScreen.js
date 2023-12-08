import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import notificationsData from "../../data/notificationdata";
import { Ionicons } from "@expo/vector-icons";
import {
  LoaderComponent,
  refreshControl,
} from "../../components/LoadingSpinner";

const NotificationItem = ({
  id,
  type,
  content,
  time,
  profileImage,
  read,
  onEllipsisPress,
}) => {
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
      <TouchableOpacity
        onPress={() => onEllipsisPress(id)}
        style={styles.optionsButton}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="grey" />
      </TouchableOpacity>
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
  const [modalVisibleEllipsis, setModalVisibleEllipsis] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };
  const handleSettingsPress = () => {
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
  // Function to handle ellipsis press
  const handleEllipsisPress = (notificationId) => {
    setCurrentNotificationId(notificationId);
    setModalVisibleEllipsis(true);
  };
  // Function to remove a notification
  const handleRemoveNotification = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== currentNotificationId
      )
    );
    // Close the modal and reset the current notification ID
    setCurrentNotificationId(null);
    setModalVisibleEllipsis(false);
  };

  // Empty notification
  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Notifications</Text>
      </View>
    );
  };
  // Dummy function to simulate loading more notifications
  const loadMoreNotifications = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        // After fetching new notifications, update the state and set loading to false
        setIsLoading(false);
      }, 2000);
    }
  };
  const refreshNotifications = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }, []);

  // Render the modal within the component
  const renderModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleEllipsis}
      onRequestClose={() => setModalVisibleEllipsis(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay1}
        activeOpacity={1}
        onPressOut={() => setModalVisibleEllipsis(false)}
      >
        <View style={styles.modalContent1}>
          <TouchableOpacity
            style={styles.modalOption1}
            onPress={handleRemoveNotification}
          >
            <Text style={{ fontSize: 17, fontWeight: 600 }}>
              Remove This Notification
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

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
        renderItem={({ item }) => (
          <NotificationItem {...item} onEllipsisPress={handleEllipsisPress} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<LoaderComponent isLoading={isLoading} />}
        refreshControl={refreshControl(isRefreshing, refreshNotifications)}
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
            {/* "Mark all as read" button */}
            <TouchableOpacity style={styles.markbtn} onPress={markAllAsRead}>
              <Text style={{ fontSize: 16, color: "white", fontWeight: 600 }}>
                Mark All As Read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.closebtn}>
                <Text style={{ fontSize: 16, color: "white", fontWeight: 600 }}>
                  Close
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderModal()}
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
  },
  iconButton: {
    marginLeft: 20,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  modalCloseButton: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    padding: 8,
  },
  markbtn: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4698B6",
  },
  closebtn: {
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#69D76C",
  },
  optionsButton: {
    marginLeft: "auto",
    padding: 10,
  },
  modalOverlay1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 30,
  },
  modalContent1: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#85E888",
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  emptyText: {
    fontSize: 20,
    color: "#666",
  },
  spinner: {
    marginVertical: 20,
  },
});
export default NotificationsScreen;
