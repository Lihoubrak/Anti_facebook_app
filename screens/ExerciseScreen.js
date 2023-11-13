import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExerciseScreen = () => {
  const exercises = [
    { id: "1", title: "Exercise Studentinfo" },
    { id: "2", title: "Exercise LoginFirebase" },
    { id: "3", title: "Exercise LoginHTPPS" },
    // Add more exercises as needed
  ];

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.id)}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Exercise List</Text>
        </View>
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  itemContainer: {
    width: "100%",
    marginVertical: 8,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ExerciseScreen;
