import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const FriendRequestComponent = ({
  name,
  mutualFriends,
  age,
  onConfirm,
  onDelete,
}) => {
  return (
    <View style={styles.friendCard}>
      <Image
        source={require("../assets/images/ProfileImage.png")}
        style={styles.profileImage}
      />
      <View style={styles.friendInfo}>
        <View style={styles.friendInfoHeader}>
          <View>
            <Text style={styles.friendName}>{name}</Text>
            <Text style={styles.mutualFriends}>
              {mutualFriends} mutual friend(s)
            </Text>
          </View>
          <Text style={styles.friendAge}>{age}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendCard: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  friendInfo: {
    marginLeft: 16,
    flex: 1,
  },
  friendInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mutualFriends: {
    fontSize: 14,
    color: "#65676b",
  },
  friendAge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#65676b",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  confirmButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "white",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#65676b",
  },
});

export default FriendRequestComponent;
