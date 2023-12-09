import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PostComponent } from "../../components";

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;

const Header = () => {
  return (
    <View style={[styles.header]}>
      <Image
        style={[styles.coverPhoto, { width: screenWidth }]}
        source={require("../../assets/images/post2.jpg")}
      />
      <Image
        style={styles.profilePhoto}
        source={require("../../assets/images/post2.jpg")}
      />
      <Text style={styles.profileName}>Brak Lihou</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1}>
          <View style={styles.addStoryBtn}>
            <Ionicons name="add" color="white" />
            <Text style={styles.buttonText}>Add to Story</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
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

const PostsScreen = () => (
  <ScrollView style={styles.detailsContainer}>
    <View style={styles.detailItem}>
      <Ionicons name="book-outline" size={20} color="#000" />
      <Text style={styles.detailText}>
        Studied at{" "}
        <Text style={styles.boldText}>Institute of Technology of Cambodia</Text>
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
        From <Text style={styles.boldText}>Kampong Thom, Cambodia</Text>
      </Text>
    </View>
    <TouchableOpacity style={styles.detailItem}>
      <Ionicons name="ellipsis-horizontal-outline" size={20} color="#000" />
      <Text style={styles.detailText}>See your About info</Text>
    </TouchableOpacity>
    <View>
      <PostComponent
        username="Brak Lihou"
        time="2h"
        postText="សួស្ដីបាទ! ខ្ញុំហួរ Zin II BC Zin 023."
        postImage={require("../../assets/images/post2.jpg")}
        profileImage={require("../../assets/images/post2.jpg")}
        likes={100}
        commentsCount={200}
        tagText="Zin II BC"
        location="Cambodia"
        tagUsername="Zin 023"
      />
      <PostComponent
        username="Brak Lihou"
        time="2h"
        postText="សួស្ដីបាទ! ខ្ញុំហួរ Zin II BC Zin 023."
        postImage={require("../../assets/images/post2.jpg")}
        profileImage={require("../../assets/images/post2.jpg")}
        likes={100}
        commentsCount={200}
        tagText="Zin II BC"
        location="Cambodia"
        tagUsername="Zin 023"
      />
    </View>
  </ScrollView>
);

const PhotosScreen = () => (
  <View style={styles.tabScreen}>
    <Text>Photos content</Text>
  </View>
);

const FriendScreen = () => (
  <View style={styles.tabScreen}>
    <Text>List of Friends</Text>
  </View>
);
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Photos" component={PhotosScreen} />
      <Tab.Screen name="Friends" component={FriendScreen} />
    </Tab.Navigator>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Tabs />
    </View>
  );
};
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   container: {
//     flex: 1,
//   },
//   coverPhotoContainer: {
//     height: 200,
//   },
//   coverPhoto: {
//     width: "100%",
//     height: "100%",
//   },
//   coverPhotoButton: {
//     position: "absolute",
//     right: 10,
//     top: 10,
//   },
//   profileInfoContainer: {
//     marginLeft: 10,
//   },
//   profilePhoto: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: "#FFFFFF",
//     position: "absolute",
//     top: 150,
//     left: 20,
//   },
//   profileName: {
//     fontWeight: "600",
//     fontSize: 26,
//     marginTop: 60,
//     marginLeft: 10,
//   },
//   profileInfo: {
//     fontSize: 16,
//     marginLeft: 120,
//   },
//   postsScreen: {},
//   detailsScreen: {
//     padding: 10,
//   },
//   detailItem: {
//     fontSize: 16,
//     paddingVertical: 5,
//   },
//   screen: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   NumFri: {
//     flexDirection: "row",
//     justifyContent: "space",
//     marginLeft: 10,
//     marginTop: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#E1E1E1",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   Addbutton: {
//     width: 150,
//     backgroundColor: "#5188B8",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#A9AFAA",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   Editbutton: {
//     width: 150,
//     backgroundColor: "#6FC978",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#A9AFAA",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "white",
//   },
//   addStory_Edit: {
//     flexDirection: "row",
//   },
//   ellipsisbtn: {
//     backgroundColor: "#E1E1E1",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#A9AFAA",
//   },
//   detailsContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   detailItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 5,
//   },
//   detailText: {
//     fontSize: 16,
//     paddingLeft: 10,
//   },
// });
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
});

export default ProfileScreen;
