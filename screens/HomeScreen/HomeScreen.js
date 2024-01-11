import React, { useContext, useEffect, useState } from "react";
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
import { ModalContext } from "../../hooks/useModalContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const image1 = require("../../assets/images/story1.png");
const image2 = require("../../assets/images/story2.png");
const image3 = require("../../assets/images/story3.png");
const image4 = require("../../assets/images/story4.png");
import * as SecureStore from "expo-secure-store";
import {
  TokenRequest,
  setupTokenRequest,
} from "../../RequestMethod/requestMethod";
import { Button, Modal } from "react-native-paper";
import PostProfileComponent from "../../components/PostProfileComponet";

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
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  const { showModal, setPostId } = useContext(ModalContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await setupTokenRequest();
      const response = await TokenRequest.post("get_list_posts", {
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "100",
      });
      setPost(response.data.data.post);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusUpdatePress = () => {
    navigation.navigate("modal");
  };
  return (
    <View>
      <FlatList
        style={{ backgroundColor: "#FFF" }}
        data={post}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return <Header onStatusUpdatePress={handleStatusUpdatePress} />;
          } else if (index === 1) {
            return <Reels />;
          } else if (index === 2) {
            return <ImageIcons />;
          } else {
            return (
              <PostComponent
                username={item.author.name}
                tagText="is with"
                tagUsername="Mashesh"
                time={item.created}
                location="Cambodia"
                postText={item.described}
                images={item.image}
                videos={item.video}
                profileImage={item.author.avatar}
                likes={parseInt(item.feel)}
                commentsCount={parseInt(item.comment_mark)}
                showModal={showModal}
                postId={item.id}
                setPostId={setPostId}
              />
              // <PostProfileComponent
              //   username="JohnDoe"
              //   time="1 hour ago"
              //   location="New York"
              //   postText="Here is a post text"
              //   postImage={{ uri: "image_url" }}
              //   profileImage={{ uri: "profile_image_url" }}
              //   likes={100}
              //   commentsCount={10}
              // />
            );
          }
        }}
      />
    </View>
  );
};

const Header = ({ onStatusUpdatePress }) => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.imagelogo}
        source={require("../../assets/images/ProfileImage.png")}
      />
      <TouchableOpacity
        style={styles.statusUpdate}
        onPress={onStatusUpdatePress}
      >
        <View>
          <Text style={styles.statusText}>What's on your mind, Lihou?</Text>
        </View>
      </TouchableOpacity>
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
            style={[
              styles.reelItem,
              {
                backgroundColor: item.backgroundColor,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              },
            ]}
          >
            <Ionicons name={item.icon} size={25} color={item.textColor} />
            <Text style={{ color: item.textColor }}>{item.text}</Text>
          </View>
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
    justifyContent: "center",
    flex: 1,
    height: 35,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f7f7f7",
  },
  statusText: {
    flex: 1,
    padding: 5,
    color: "gray",
    textAlign: "center",
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
    gap: 3,
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
  modalContainer: {
    backgroundColor: "red",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  commentInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  closeModalButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
  closeModalText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
