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
import { CommentModal, ModalPostComponent } from "../components";
import * as SecureStore from "expo-secure-store";
import { FontAwesome5 } from "@expo/vector-icons";
import { TokenRequest } from "../RequestMethod/requestMethod";
import { ActivityIndicator } from "react-native-paper";
const profileImage = require("../assets/images/ProfileImage.png");
const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route) || "Home";
  const isHomeScreen = routeName === "Home";
  const [coin, setCoin] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isModalVisible, hideModal, postId } = useContext(ModalContext);
  const [isReplying, setIsReplying] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const handleIconClick = () => {
    navigation.navigate("message");
  };
  SecureStore.getItemAsync("coins")
    .then((storedCoinsString) => {
      if (storedCoinsString) {
        const coins = parseInt(storedCoinsString, 10);
        setCoin(coins);
      } else {
        console.log("No coins found in SecureStore");
      }
    })
    .catch((error) => {
      console.error("Error fetching coins:", error);
    });
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Check if postId is available
        if (!postId) {
          console.log("postId is null or undefined");
          return;
        }

        const response = await TokenRequest.post("/get_mark_comment", {
          id: postId,
          index: 0,
          count: 10,
        });
        if (response.data && response.data.data) {
          const fetchedComments = response.data.data.map((comment) => ({
            id: comment.id,
            profileImage:
              comment.poster.avatar && typeof comment.poster.avatar === "string"
                ? { uri: comment.poster.avatar }
                : null,
            username: comment.poster.name,
            text: comment.mark_content,
            time: comment.created,
            replies: comment.comments,
          }));

          setComments(fetchedComments);
        }
      } catch (error) {
        console.error(
          "Error fetching comments:",
          error.response ? error.response.data : error
        );
      }
    };
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handlePostComment = async () => {
    try {
      const response = await TokenRequest.post("/set_mark_comment", {
        id: postId,
        content: newComment,
        index: "0",
        count: "10",
        type: "0",
      });
      // Extract the array of new comments from the response
      const newCommentsData = response.data.data;
      // Construct an array of new comment objects
      const newComments = newCommentsData.map((commentData) => ({
        id: commentData.id,
        profileImage: { uri: commentData.poster.avatar },
        username: commentData.poster.name,
        text: commentData.mark_content,
        time: commentData.created,
        replies: commentData.comments, // Assuming this is the structure for replies
      }));

      // Add the new comments to the existing comments
      setComments((prevComments) => [...prevComments, ...newComments]);

      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplyComment = async (comment) => {
    setIsReplying(true);
    setReplyToComment(comment);
  };
  const handleReplyPostComment = async () => {
    try {
      const response = await TokenRequest.post("/set_mark_comment", {
        id: postId,
        content: newComment,
        index: "0",
        count: "10",
        mark_id: replyToComment.id,
        type: "1",
      });

      const newCommentsData = response.data.data;

      // Construct an array of new replied comment objects
      const repliedComments = newCommentsData.map((commentData) => ({
        id: commentData.id,
        profileImage: { uri: commentData.poster.avatar },
        username: commentData.poster.name,
        text: commentData.mark_content,
        time: commentData.created,
        replies: commentData.comments,
      }));

      // Update the replied comments in the local state
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment.id === replyToComment.id
            ? { ...prevComment, replies: repliedComments }
            : prevComment
        )
      );

      setNewComment("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.headerContainer}>
        {!isHomeScreen && (
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
      <CommentModal
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handlePostComment={handlePostComment}
        isModalVisible={isModalVisible}
        hideModal={hideModal}
        postId={postId}
        handleReplyComment={handleReplyComment}
        isReplying={isReplying}
        replyToComment={replyToComment}
        setIsReplying={setIsReplying}
        setReplyToComment={setReplyToComment}
        handleReplyPostComment={handleReplyPostComment}
      />
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
