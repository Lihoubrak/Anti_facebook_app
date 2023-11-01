import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const PostComponent = ({
  username,
  time,
  location,
  postText,
  postImage,
  profileImage,
  likes,
  commentsCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.timeLocation}>
            <Text style={styles.time}>{time}</Text>
            <Ionicons name="location" size={16} style={styles.locationIcon} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" style={styles.moreIcon} />
      </View>
      <Text style={styles.postText}>{postText}</Text>
      <Image source={postImage} style={styles.postImage} />
      <View style={styles.actions}>
        <Ionicons name="heart" size={24} style={styles.actionIcon} />
        <Ionicons name="chatbox" size={24} style={styles.actionIcon} />
        <Ionicons name="send" size={24} style={styles.actionIcon} />
      </View>
      <View style={styles.likesComments}>
        <View style={styles.likeCommentIcons}>
          <Ionicons name="heart" size={16} style={styles.smallIcon} />
          <Ionicons name="chatbox" size={16} style={styles.smallIcon} />
          <Text style={styles.likeText}>{likes} Likes</Text>
        </View>
        <Text style={styles.commentCount}>{commentsCount} Comments</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16, // Increased font size
  },
  timeLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginRight: 5,
    color: "#888", // Lighter color for time
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 14, // Increased font size
    color: "#888", // Lighter color for location
  },
  moreIcon: {
    fontSize: 24,
  },
  postText: {
    marginTop: 10,
    fontSize: 16,
  },
  postImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionIcon: {
    fontSize: 24,
    color: "#333",
  },
  likesComments: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likeCommentIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    fontSize: 16,
    color: "#333",
    marginRight: 5,
  },
  likeText: {
    fontWeight: "bold",
  },
  commentCount: {
    marginTop: 5,
    color: "#555",
  },
});

export default PostComponent;
