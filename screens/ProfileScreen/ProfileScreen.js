import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ModalEditAndReport, PostComponent } from "../../components";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import friendsData from "../../data/friendsData";
import photosData from "../../data/photoData";
import { useNavigation } from "@react-navigation/native";
import { TokenRequest, setupTokenRequest } from "../../requestMethod";
import { ModalContext } from "../../hooks/useModalContext";
import * as SecureStore from "expo-secure-store";
import base64 from "base-64";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { checkIfPostLiked } from "../../utils/checkIfPostLiked";
const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;

const Header = ({
  pickProfileImage,
  pickCoverImage,
  profileImage,
  coverImage,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header]}>
      <View>
        <Image
          style={[styles.coverPhoto, { width: screenWidth }]}
          source={
            coverImage
              ? { uri: coverImage }
              : require("../../assets/images/post2.jpg")
          }
        />
        <TouchableOpacity
          style={styles.cameraIconCover}
          onPress={pickCoverImage}
        >
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          style={styles.profilePhoto}
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/images/post2.jpg")
          }
        />
        <TouchableOpacity
          style={styles.cameraIconProfile}
          onPress={pickProfileImage}
        >
          <Ionicons name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>Brak Lihou</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1}>
          <View style={styles.addStoryBtn}>
            <Ionicons name="add" color="white" />
            <Text style={styles.buttonText}>Add to Story</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <View style={styles.EditPFBtn}>
            <Ionicons name="construct" color="white" style={{ right: 5 }} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <View style={styles.ellipsisBtn}>
            <Ionicons name="ellipsis-horizontal" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostsScreen = ({ profileImage }) => {
  const [posts, setPosts] = useState([]);
  const { showModal, setPostId } = useContext(ModalContext);
  const [postIdEdit, setPostIdEdit] = useState("");
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [reportSubject, setReportSubject] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [userTokenId, setUserTokenId] = useState(null);
  const [like, setLike] = useState(false);

  const route = useRoute();
  const onDelete = async (postId) => {
    try {
      await setupTokenRequest();
      const response = await TokenRequest.post("/delete_post", {
        id: postId,
      });
      // Check if the deletion was successful based on the response data
      if (response.data && response.data.message === "OK") {
        setEdit(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const onReport = async (postId) => {
    try {
      await setupTokenRequest();
      const response = await TokenRequest.post("/report_post", {
        id: postId,
        subject: reportSubject,
        details: reportDetails,
      });
      console.log("Post reported successfully:", response.data);
      setEdit(false);
      // Clear the report subject and details after reporting
      setReportSubject("");
      setReportDetails("");
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserTokenId();
      checkIfLiked();
    }, [])
  );
  const checkIfLiked = async () => {
    if (postIdEdit && userId) {
      const liked = await checkIfPostLiked(postIdEdit, userId);
      setLike(liked);
    }
  };
  useEffect(() => {
    if (userTokenId) {
      fetchData();
      checkIfLiked();
    }
  }, [userTokenId]);
  const fetchUserTokenId = async () => {
    try {
      const token = await SecureStore.getItemAsync("loginToken");

      if (!token) {
        console.error("Token not found.");
        return;
      }

      const trimmedToken = token.trim();
      const decodedToken = JSON.parse(
        base64.decode(trimmedToken.split(".")[1])
      );

      if (!decodedToken || !decodedToken.id) {
        console.error("Invalid or missing user ID in the decoded token.");
        return;
      }

      setUserTokenId(decodedToken.id);
    } catch (error) {
      console.error("Error fetching user ID from token:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await TokenRequest.post("get_list_posts", {
        user_id: userTokenId,
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "100",
      });
      setPosts(response.data.data.post);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEditAndReport = (postId, userId) => {
    setUserId(userId);
    setPostIdEdit(postId);
    setEdit(!edit);
  };
  return (
    <View style={styles.detailsContainer}>
      <View>
        <FlatList
          data={posts}
          keyExtractor={(post, index) => index.toString()}
          ListHeaderComponent={
            <>
              <View style={styles.detailItem}>
                <Ionicons name="book-outline" size={20} color="#000" />
                <Text style={styles.detailText}>
                  Studied at{" "}
                  <Text style={styles.boldText}>
                    Sovanrith Technology Institute
                  </Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="briefcase-outline" size={20} color="#000" />
                <Text style={styles.detailText}>
                  Founder and CEO at{" "}
                  <Text style={styles.boldText}>Jing Harb .Co, Ltd</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="home-outline" size={20} color="#000" />
                <Text style={styles.detailText}>
                  Lives in <Text style={styles.boldText}>Hanoi</Text>
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={20} color="#000" />
                <Text style={styles.detailText}>
                  From{" "}
                  <Text style={styles.boldText}>Kampong Thom, Cambodia</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.detailItem}>
                <Ionicons
                  name="ellipsis-horizontal-outline"
                  size={20}
                  color="#000"
                />
                <Text style={styles.detailText}>See your About info</Text>
              </TouchableOpacity>
            </>
          }
          renderItem={({ item, index }) => (
            <PostComponent
              key={index}
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
              setPostId={setPostId}
              showModal={showModal}
              postId={item.id}
              userId={item.author.id}
              handleEditAndReport={handleEditAndReport}
              fetchData={fetchData}
              liked={like}
            />
          )}
        />
        <ModalEditAndReport
          editModalVisible={edit}
          setEdit={setEdit}
          onDelete={() => onDelete(postIdEdit)}
          onReport={() => onReport(postIdEdit)}
          reportSubject={reportSubject}
          setReportSubject={setReportSubject}
          reportDetails={reportDetails}
          setReportDetails={setReportDetails}
          postId={postIdEdit}
          edit={edit}
          userId={userId}
        />
      </View>
    </View>
  );
};
// Photo Tab
const columns = 3;
const { width } = Dimensions.get("window");
const photoSize = width / columns;
const PhotosScreen = () => (
  <View style={styles.container}>
    <Text style={styles.headerText}>Your photos</Text>
    <FlatList
      data={photosData}
      renderItem={({ item }) => (
        <Image style={styles.photo} source={item.uri} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={columns}
    />
  </View>
);
// Friends Section
const numColums = 3;
const size = Dimensions.get("window").width / numColums;
const FriendScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.card}>
        <Image source={item.imageUri} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  // render list of friends
  return (
    <FlatList
      data={friendsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColums}
    />
  );
};
const Tabs = ({ profileImage }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        children={() => <PostsScreen profileImage={profileImage} />}
      />
      <Tab.Screen name="Photos" component={PhotosScreen} />
      <Tab.Screen name="Friends" component={FriendScreen} />
    </Tab.Navigator>
  );
};

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  //handle Pick Profile Image
  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
    }
  };
  // handle Pick cover Image
  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
      setCoverImage(imageUri);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        pickProfileImage={pickProfileImage}
        pickCoverImage={pickCoverImage}
        profileImage={profileImage}
        coverImage={coverImage}
      />
      <Tabs profileImage={profileImage} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  coverPhoto: {
    height: 200,
    resizeMode: "cover",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
    marginTop: -60,
  },
  cameraIconCover: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
    borderRadius: 20,
  },
  cameraIconProfile: {
    position: "absolute",
    right: -1,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    bottom: 10,
  },
  button1: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#5993BD",
  },
  button2: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#63AF51",
  },
  button3: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addStoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
  },
  EditPFBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
  },
  // Post section
  detailsContainer: {
    marginLeft: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  detailText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  deatils: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  boldText: {
    fontWeight: "600",
  },
  //Photo Tab
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  photo: {
    width: photoSize,
    height: photoSize,
    margin: 1,
  },
  // Friends Tab
  itemContainer: {
    width: size,
    height: size + 20,
    padding: 2,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: size,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
});

export default ProfileScreen;
