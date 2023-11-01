import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostComponent, PostProfileComponet } from "../../components";
const image1 = require("../../assets/images/story1.png");
const image2 = require("../../assets/images/story2.png");
const image3 = require("../../assets/images/story3.png");
const image4 = require("../../assets/images/story4.png");

const imageSources = [image1, image2, image3, image4];

const reelItemStyles = [
  {
    backgroundColor: "#fef9e7",
    icon: "videocam",
    text: "Reels",
    textColor: "#f9c50f",
  },
  {
    backgroundColor: "#ecf9ec",
    icon: "tv",
    text: "Room",
    textColor: "#44c041",
  },
  {
    backgroundColor: "#feeee5",
    icon: "people",
    text: "Group",
    textColor: "#f85900",
  },
  {
    backgroundColor: "#edf0fc",
    icon: "videocam",
    text: "Live",
    textColor: "#486be5",
  },
];
const HomeScreen = () => {
  const data = Array.from({ length: 20 }, (_, i) => ({ id: String(i) }));
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        if (index === 0) {
          return <Header />;
        } else if (index === 1) {
          return <Reels />;
        } else if (index === 2) {
          return <ImageIcons />;
        } else if (index === 3) {
          return (
            <PostComponent
              username="Deven Mestry is with Mashesh"
              time="1h"
              location="Cambodia"
              postText="Old is Gold...!!"
              postImage={require("../../assets/images/post.png")}
              profileImage={require("../../assets/images/ProfileImage.png")}
              likes={157}
              commentsCount={4}
            />
          );
        } else {
          return (
            <PostProfileComponet
              username="John Doe"
              time="2h ago"
              location="New York, NY"
              postText="This is a sample post text."
              postImage={require("../../assets/images/post.png")}
              profileImage={require("../../assets/images/ProfileImage.png")}
              likes={42}
              commentsCount={7}
            />
          );
        }
      }}
    />
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.imagelogo}
        source={require("../../assets/images/ProfileImage.png")}
      />
      <View style={styles.statusUpdate}>
        <TextInput
          style={styles.statusText}
          placeholder="What's on your mind, Lihou?"
        />
      </View>
      <TouchableOpacity style={styles.searchButton}>
        <Ionicons name="search" size={25} color="#686868" />
      </TouchableOpacity>
    </View>
  );
};

const Reels = () => {
  return (
    <View style={styles.reelContainer}>
      {reelItemStyles.map((item, index) => (
        <TouchableOpacity key={index} style={styles.reelItemContainer}>
          <View
            style={[styles.reelItem, { backgroundColor: item.backgroundColor }]}
          >
            <Ionicons name={item.icon} size={25} color={item.textColor} />
          </View>
          <Text style={{ color: item.textColor, marginTop: 5 }}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ImageIcons = () => {
  return (
    <View style={styles.imageIconContainer}>
      <FlatList
        data={imageSources}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.imageIconItem}>
            <Image source={item} style={styles.imageIcon} />
            {index === 0 ? (
              <Ionicons
                name="add-circle-sharp"
                size={25}
                color="blue"
                style={styles.addIcon}
              />
            ) : (
              <View style={styles.profileIcon}>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/images/ProfileImage.png")}
                />
                <Text style={styles.profileName}>lihou</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  statusUpdate: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 34,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f7f7f7",
  },
  statusText: {
    flex: 1,
    padding: 5,
  },
  searchButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
  },
  imagelogo: {
    width: 63,
    height: 63,
    borderRadius: 100,
  },
  reelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  reelItemContainer: {
    alignItems: "center",
  },
  reelItem: {
    alignItems: "center",
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 15,
  },
  imageIconContainer: {
    padding: 10,
  },
  imageIconItem: {
    alignItems: "center",
    paddingRight: 10,
    paddingBottom: 10,
  },
  imageIcon: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 15,
  },
  addIcon: {
    bottom: 15,
  },
  profileIcon: {
    alignItems: "center",
    bottom: 15,
  },
  profileImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "blue",
  },
  profileName: {
    fontFamily: "Regular",
  },
});

export default HomeScreen;
