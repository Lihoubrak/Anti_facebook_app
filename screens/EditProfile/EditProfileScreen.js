import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  // handle Pick Profile Image
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
      setCoverPhoto(imageUri);
    }
  };

  const ProfilePicture = ({ onAddPressPro, imageUriPro }) => {
    return (
      <View style={styles.profilePictureSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddPressPro}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.profileImage}
          source={
            imageUriPro
              ? { uri: imageUriPro }
              : require("../../assets/images/post2.jpg")
          }
        />
      </View>
    );
  };

  const CoverPhoto = ({ onAddPress, imageUri }) => {
    return (
      <View style={styles.coverPhotoSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cover photo</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.coverPhotoPlaceholder}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require("../../assets/images/post2.jpg")
            }
            style={styles.coverPhoto}
          />
        </View>
      </View>
    );
  };
  const ProfileDetails = () => {
    return (
      <View style={styles.detailsSection}>
        <View style={styles.sectionHeader1}>
          <Text style={styles.DetailTitle}>Details</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContent}>
          {/* Render details  */}
          <DetailItem
            iconName="book"
            label="Studied at"
            value="Sovanrith Technology Institute"
          />
          <DetailItem
            iconName="briefcase"
            label="Founder and CEO at"
            value="Jing Harb .Co, Ltd"
          />
          <DetailItem iconName="home" label="Lives in" value="Hanoi, Vietnam" />
          <DetailItem
            iconName="location"
            label="From"
            value="Kampong Thom, Cambodia"
          />
        </View>
      </View>
    );
  };
  const Separator = () => <View style={styles.separator} />;
  const DetailItem = ({ label, value, iconName }) => (
    <View style={styles.detailItem}>
      <Ionicons
        name={iconName}
        size={20}
        color="#aaa"
        style={styles.detailIcon}
      />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <ProfilePicture
        onAddPressPro={pickProfileImage}
        imageUriPro={profileImage}
      />
      <Separator />
      <CoverPhoto onAddPress={pickCoverImage} imageUri={coverPhoto} />
      <Separator />
      <ProfileDetails />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D3F40",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
  profilePictureSection: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
  },
  coverPhotoPlaceholder: {
    backgroundColor: "#333",
    width: "90%",
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  detailsSection: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  sectionHeader1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  DetailTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 4,
    position: "absolute",
    right: 10,
    top: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  detailsContent: {
    marginTop: 20,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    color: "#aaa",
    fontSize: 16,
    left: 5,
  },
  detailValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    left: 10,
  },
  separator: {
    borderBottomColor: "#676C6D",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

export default EditProfileScreen;
