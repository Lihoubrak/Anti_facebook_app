import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const Separator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/cover.jpg")}
            style={styles.coverImage}
          />
          <Image
            source={require("../../assets/images/man.jpg")}
            style={styles.profileImag}
          />
        </View>
        {/* User Name */}
        <View style={styles.profileDetails}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Brak Lihou</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Storybutton}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "white", fontWeight: 500 }}>
                <Ionicons name="add" style={{ fontSize: 20 }} />
                Add to Story
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Editbutton}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="construct"
                style={{ fontSize: 20, marginRight: 8, color: "white" }}
              />
              <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Iconbutton}>
            <Ionicons
              name="ellipsis-vertical"
              style={{ fontSize: 20, fontWeight: 500 }}
            />
          </TouchableOpacity>
        </View>
        {/* line */}
        <View style={styles.separator1}>
          <Separator />
        </View>

        {/* post friends follower following */}
        <View style={styles.data}>
          <View>
            <TouchableOpacity style={styles.posts}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Posts</Text>
              {/* <Text style={{ fontSize: 15, fontWeight: 600 }}>100</Text> */}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.posts}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Friends</Text>
              {/* <Text style={{ fontSize: 15, fontWeight: 600 }}>100</Text> */}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.posts}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Followers</Text>
              {/* <Text style={{ fontSize: 15, fontWeight: 600 }}>100</Text> */}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.posts}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Following</Text>
              {/* <Text style={{ fontSize: 15, fontWeight: 600 }}>100</Text> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsInfoContainer}>
          <View style={styles.detailsInfo}>
            <Ionicons
              name="briefcase"
              style={{ fontSize: 20, fontWeight: 500 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
              Founder and CEO at
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 5 }}>
              Jing Harb .Co, Ltd
            </Text>
          </View>
          <View style={styles.detailsInfo}>
            <Ionicons name="book" style={{ fontSize: 20, fontWeight: 500 }} />
            <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
              Studied CS at
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 5 }}>
              Sovanrith International College
            </Text>
          </View>
          <View style={styles.detailsInfo}>
            <Ionicons name="home" style={{ fontSize: 20, fontWeight: 500 }} />
            <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
              Lives in
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 5 }}>
              Hanoi, Vietnam
            </Text>
          </View>
          <View style={styles.detailsInfo}>
            <Ionicons
              name="location"
              style={{ fontSize: 20, fontWeight: 500 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
              From
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 5 }}>
              Kampong Thom, Cambodia
            </Text>
          </View>
          <View style={styles.detailsInfo}>
            <Ionicons
              name="ellipsis-horizontal"
              style={{ fontSize: 20, fontWeight: 500 }}
            />
            <TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
                See your About info
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  coverImage: { width: "100%", height: 190 },
  profileImag: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: "white",
    borderWidth: 1,
    bottom: 70,
  },
  profileDetails: { alignItems: "center", bottom: 50 },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 30,
  },
  Storybutton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#0174BE",
    alignItems: "center",
    justifyContent: "center",
  },
  Editbutton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  Iconbutton: {
    width: 40,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#5F6F52",
    borderRadius: 5,
  },
  separator1: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
  },

  data: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  posts: {
    width: 90,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsInfoContainer: {
    padding: 10,
  },
  detailsInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space",
    padding: 5,
  },
});

export default ProfileScreen;
