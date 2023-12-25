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
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { ModalContext } from "../../hooks/useModalContext";
const ShowAllImagePost = ({ route, navigation }) => {
  const { itemImage } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [imageTexts, setImageTexts] = useState(itemImage.map(() => ""));
  const [itemImages, setItemImages] = useState(itemImage);
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
    setItemImages(route.params.itemImage);
  }, [route.params.itemImage]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("modal")}>
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
