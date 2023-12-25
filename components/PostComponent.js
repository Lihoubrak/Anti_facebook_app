import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const PostComponent = ({
  username,
  time,
  location,
  postText,
  postImage,
  profileImage,
  likes,
  commentsCount,
  tagUsername,
  tagText,
}) => {
  const handleMessageClick = () => {
    // Handle message click
  };

  const handleLikeClick = () => {
    // Handle like click
  };

  const handleCommentClick = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.username}>
            {username} <Text style={{ fontWeight: "normal" }}>{tagText} </Text>
            {tagUsername}
          </Text>
          <View style={styles.timeLocation}>
            <Text style={styles.time}>{time}</Text>
            <EvilIcons
              name="location"
              size={20}
              color="black"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
        <Ionicons
          name="ellipsis-vertical"
          style={styles.moreIcon}
          color={"#333"}
        />
      </View>
      <Text style={styles.postText}>{postText}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          }}
          style={styles.postImage}
        />
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          }}
          style={styles.postImage}
        />
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          }}
          style={styles.postImage}
        />
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          }}
          style={styles.postImage}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLikeClick}>
          <EvilIcons name="like" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCommentClick}>
          <EvilIcons name="comment" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMessageClick}>
          <EvilIcons name="share-apple" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.likesComments}>
        <View style={styles.likeCommentIcons}>
          <TouchableOpacity onPress={handleLikeClick}>
            <EvilIcons name="like" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons name="comment" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.likeText}>{likes} Likes</Text>
        </View>
        <Text style={styles.commentCount}>{commentsCount} Comments</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    // padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    // marginTop: 10,
    fontSize: 16,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  postImage: {
    width: "50%",
    height: 200,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  actionIcon: {
    fontSize: 24,
    color: "#333",
  },
  likesComments: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
    color: "#555",
  },
  commentCount: {
    marginTop: 5,
    color: "#555",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
});

export default PostComponent;
