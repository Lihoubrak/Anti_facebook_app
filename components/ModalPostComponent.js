import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ModalContext } from "../hooks/useModalContext";
import { TokenRequest } from "../RequestMethod/requestMethod";
import * as SecureStore from "expo-secure-store";
const ModalPostComponent = ({ isModalVisible }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [text, setText] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const { hideModal } = useContext(ModalContext);
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("loginToken");
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);
  const handlePost = async () => {
    try {
      // Prepare the form data for the request
      const formData = new FormData();
      formData.append("described", text);
      selectedImages.forEach((image, index) => {
        formData.append(`image${index}`, {
          uri: image.uri,
          type: "image/jpeg",
          name: `image_${index}.jpg`,
        });
      });

      // Send the post request with the form data
      const response = await TokenRequest.post("/add_post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Post successful");
        navigation.navigate("Home");
        hideModal();
      } else {
        console.error("Post failed");
      }
    } catch (error) {
      console.error("Error posting:", error);
      console.log(error.response?.data);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("showall", {
          itemImage: selectedImages,
        })
      }
      style={{ width: "50%", marginBottom: 10 }}
    >
      <Image source={{ uri: item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  const remainingImagesCount = selectedImages.length - (showAllImages ? 0 : 4);
  const handleBack = () => {
    navigation.navigate("Home");
    hideModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Create Post</Text>
          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <Text style={{ color: "#1877f2" }}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Modal content */}
        <View style={styles.modalContent}>
          <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
            <View style={styles.userInfoContainer}>
              <Image
                source={require("../assets/images/story4.png")}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.userName}>Lihou Brak</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="earth-outline" size={15} color="black" />
                  <EvilIcons name="location" size={20} color="black" />
                  <Text style={styles.locationText}>Cambodia</Text>
                </View>
              </View>
            </View>
          </View>
          <TextInput
            placeholder="What's on your mind?"
            multiline={true}
            style={styles.postInput}
            value={text}
            onChangeText={(newText) => setText(newText)}
          />
          <View style={styles.imageContainer}>
            <FlatList
              data={selectedImages.slice(0, 4)}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.uri}
              numColumns={2}
            />
            {selectedImages.length > 4 &&
              remainingImagesCount > 0 &&
              !showAllImages && (
                <Text style={styles.remainingImagesText}>
                  +{remainingImagesCount}
                </Text>
              )}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <EvilIcons name="image" size={24} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people-outline" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="happy-outline" size={24} color="pink" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <EvilIcons name="location" size={24} color="brown" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postButton: {
    padding: 10,
  },
  modalContent: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
  },
  postInput: {
    borderColor: "#ddd",
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  postImage: {
    height: 200,
    resizeMode: "cover",
  },
  remainingImagesText: {
    color: "#ffff",
    textAlign: "center",
    fontSize: 30,
    position: "absolute",
    right: 80,
    bottom: 80,
  },
  allImagesContainer: {
    marginBottom: 10,
    alignItems: "center",
  },

  captionInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
});

export default ModalPostComponent;
