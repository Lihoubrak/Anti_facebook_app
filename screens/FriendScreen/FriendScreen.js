import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FriendRequestComponent } from "../../components";

const FriendScreen = () => {
  const friendRequests = [
    {
      id: 1,
      name: "Kiran Pawat",
      mutualFriends: 1,
      age: "9w",
    },
    {
      id: 2,
      name: "John Doe",
      mutualFriends: 2,
      age: "2w",
    },
    {
      id: 3,
      name: "Alice Johnson",
      mutualFriends: 0,
      age: "4w",
    },
    {
      id: 4,
      name: "Bob Smith",
      mutualFriends: 3,
      age: "1w",
    },
    {
      id: 5,
      name: "Emma Wilson",
      mutualFriends: 2,
      age: "5w",
    },
    {
      id: 6,
      name: "David Brown",
      mutualFriends: 1,
      age: "6w",
    },
    {
      id: 7,
      name: "Sophia Miller",
      mutualFriends: 4,
      age: "3w",
    },
    {
      id: 8,
      name: "William Lee",
      mutualFriends: 2,
      age: "7w",
    },
    {
      id: 9,
      name: "Olivia Davis",
      mutualFriends: 3,
      age: "2w",
    },
    {
      id: 10,
      name: "James Wilson",
      mutualFriends: 1,
      age: "8w",
    },
  ];

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Friends</Text>
        <Ionicons name="search" style={styles.searchIcon} />
      </View>
      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.sectionTitle}>Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.sectionSubtitle}>Your friend</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.yourFriendSection}>
        <View style={styles.friendCountContainer}>
          <Text style={styles.friendTitle}>Your friend</Text>
          <Text style={styles.friendCount}>440</Text>
        </View>
        <Text style={styles.seeAllText}>See all</Text>
      </View>

      <FlatList
        scrollEnabled={false}
        data={friendRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FriendRequestComponent
            name={item.name}
            mutualFriends={item.mutualFriends}
            age={item.age}
            onConfirm={() => {
              console.log(`Confirmed friend request for ${item.name}`);
            }}
            onDelete={() => {
              console.log(`Deleted friend request for ${item.name}`);
            }}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchIcon: {
    fontSize: 28,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "blue",
    padding: 8,
    color: "white",
    borderRadius: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    backgroundColor: "blue",
    padding: 8,
    color: "white",
    borderRadius: 4,
  },
  yourFriendSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",

    paddingTop: 10,
    paddingBottom: 10,
  },
  friendCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  friendCount: {
    marginLeft: 8,
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 16,
    color: "#1877f2",
  },
});

export default FriendScreen;
