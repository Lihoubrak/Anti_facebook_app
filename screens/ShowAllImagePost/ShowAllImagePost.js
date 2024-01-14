import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { ModalContext } from "../../hooks/useModalContext";
import { useRoute } from "@react-navigation/native";
const ShowAllImagePost = ({ navigation }) => {
  const route = useRoute();
  const { itemImage: initialImages } = route.params;
  const [imageTexts, setImageTexts] = useState(initialImages.map(() => ""));
  const [itemImages, setItemImages] = useState(initialImages);
  const screenWidth = Dimensions.get("window").width;

  const handleTextInputChange = (index, text) => {
    setImageTexts((prevTexts) =>
      prevTexts.map((prevText, i) => (i === index ? text : prevText))
    );
  };

  const handleRemoveImage = (index) => {
    setItemImages((prevImages) => prevImages.filter((image, i) => i !== index));
    setImageTexts((prevTexts) => prevTexts.filter((text, i) => i !== index));
  };

  useEffect(() => {
    if (route.params?.itemImage) {
      setItemImages(route.params.itemImage);
    }
  }, [route.params?.itemImage]);

  const handleNavigateBack = () => {
    const updatedImagesWithText = itemImages.map((image, index) => ({
      ...image,
      text: imageTexts[index],
    }));
    navigation.navigate("modal", { updatedImagesWithText });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#333"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit</Text>
        </View>
        <Text style={styles.headerText}>Done</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={itemImages} // Render using the updated image list
        renderItem={({ item, index }) => (
          <View
            style={{ paddingHorizontal: 10, alignItems: "center" }}
            key={index}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                width: screenWidth,
                minHeight: 300,
                aspectRatio: item.width / item.height,
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter text for this image"
              value={imageTexts[index]}
              onChangeText={(text) => handleTextInputChange(index, text)}
            />
            <TouchableOpacity onPress={() => handleRemoveImage(index)}>
              <EvilIcons name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  textInput: {
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
  },

  headerLeft: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ShowAllImagePost;
