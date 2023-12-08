import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const WatchScreen = () => {
  const [activeTab, setActiveTab] = useState("ForYou");
  const [filteredCards, setFilteredCards] = useState([]);

  // render tabs function
  const renderTab = (tabName) => (
    <TouchableOpacity
      onPressIn={() => setActiveTab(tabName)}
      style={[
        styles.tabItem,
        activeTab === tabName ? styles.activeTabItem : null,
      ]}
      onPress={() => setActiveTab(tabName)}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === tabName ? styles.activeTabText : null,
        ]}
      >
        {tabName}
      </Text>
    </TouchableOpacity>
  );
  const videoData = {
    ForYou: [
      {
        title: "Amazing Nature Documentary",
        thumbnail:
          "https://www.achieveglobalsafaris.com/wp-content/uploads/2019/08/Webp.net-compress-image-54.jpg",
        view: "1.2M",
        likes: "950K",
        comments: "15K",
        shares: "5K",
        name: "World docs",
        profileImg: require("../../assets/images/naturedoc.jpg"),
        time: "2h ago",
      },
      {
        title: "Daily Workout Routine",
        thumbnail:
          "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2016/06/workout.jpg",
        view: "500K",
        likes: "300K",
        comments: "8K",
        shares: "2K",
        name: "World docs",
        profileImg: require("../../assets/images/fitness.jpg"),
        time: "2h ago",
      },
      // ... more videos for ForYou
    ],
    Live: [
      {
        title: "City Life Stream",
        thumbnail:
          "https://th.bing.com/th/id/R.5c7d4f54bd2b1030853a49f576b01a27?rik=mkc0Xxl%2fE5qcOA&riu=http%3a%2f%2fstatic.asiawebdirect.com%2fm%2fbangkok%2fportals%2fvietnam%2fhomepage%2fhanoi%2ftop10%2fpagePropertiesImage%2fbest-of-hanoi.jpg.jpg&ehk=xeFgVjkYonqTObikk9dO%2f0TmZxV2PC9i0vvodeMSdCo%3d&risl=&pid=ImgRaw&r=0",
        view: "2.3M",
        likes: "1.2M",
        comments: "20K",
        shares: "10K",
        name: "World docs",
        profileImg: require("../../assets/images/city.jpg"),
        time: "LIVE",
      },
      {
        title: "Live Music Concert",
        thumbnail:
          "https://th.bing.com/th/id/R.e2ff123c81217cbf19fd13443c22ccc9?rik=sxB9TJiz3liCpA&pid=ImgRaw&r=0",
        view: "800K",
        likes: "500K",
        comments: "12K",
        shares: "3K",
        name: "World docs",
        profileImg: require("../../assets/images/concert.jpg"),
        time: "LIVE",
      },
      {
        title: "Mobile Legends",
        thumbnail: "https://wallpaperset.com/w/full/c/7/2/235463.jpg",
        view: "5M",
        likes: "2.5M",
        comments: "30K",
        shares: "20K",
        name: "World docs",
        profileImg: require("../../assets/images/mbll.jpg"),
        time: "LIVE",
      },
    ],
    Music: [
      {
        title: "Top Pop Hits 2023",
        thumbnail:
          "https://th.bing.com/th/id/R.5181468e18b222366df5949880849a3b?rik=eFmmeCDPBo28uA&pid=ImgRaw&r=0",
        view: "3M",
        likes: "2M",
        comments: "25K",
        shares: "15K",
        name: "World docs",
        profileImg: require("../../assets/images/man.jpg"),
        time: "2h ago",
      },
      {
        title: "Classical Music Evening",
        thumbnail:
          "https://th.bing.com/th/id/R.7e8e83350b8f40f22217737f1a93147c?rik=01%2bJM7ChaWiEgw&pid=ImgRaw&r=0",
        view: "1M",
        likes: "700K",
        comments: "10K",
        shares: "4K",
        name: "World docs",
        profileImg: require("../../assets/images/man.jpg"),
        time: "2h ago",
      },
    ],
    Gaming: [
      {
        title: "Mobile Legends",
        thumbnail: "https://wallpaperset.com/w/full/c/7/2/235463.jpg",
        view: "4M",
        likes: "2.5M",
        comments: "30K",
        shares: "20K",
        name: "World docs",
        profileImg: require("../../assets/images/man.jpg"),
        time: "2h ago",
      },
      {
        title: "M5 World Champioonship 2023",
        thumbnail:
          "https://static.gosugamers.net/ac/7d/a1/8e34ee03cab7d984c486a296fc992c54ee62d0dc935f466d307126ac2c.jpg",
        view: "2M",
        likes: "1M",
        comments: "16K",
        shares: "8K",
        name: "World docs",
        profileImg: require("../../assets/images/man.jpg"),
        time: "2h ago",
      },
    ],
  };
  useEffect(() => {
    // Filter cards based on the active tab
    setFilteredCards(videoData[activeTab]);
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      {/* header text */}
      <View style={styles.headerText}>
        <Text style={{ fontSize: 25, fontWeight: 600 }}>Videos</Text>
      </View>
      {/* render tabs */}
      <View style={styles.tabs}>
        {Object.keys(videoData).map((tabName) => renderTab(tabName))}
      </View>
      {/* content card */}
      <ScrollView style={styles.feed}>
        {filteredCards.map((card, index) => (
          <View style={styles.card} key={`card-${index}`}>
            <View style={styles.postHeader}>
              <Image source={card.profileImg} style={styles.profileImg} />
              <View style={styles.postInfo}>
                <Text style={styles.profileName}>{card.name}</Text>
                <View style={styles.postTimeContainer}>
                  <Ionicons name="earth" size={12} color="black" />
                  <Text style={styles.postTime}>{card.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionsButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Image style={styles.thumbnail} source={{ uri: card.thumbnail }} />
            <View style={styles.liveBadgeContainer}>
              {activeTab === "Live" && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              )}
              <Text style={styles.viewerCount}>{card.view} watching</Text>
            </View>
            <Text style={styles.title}>{card.title}</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="chatbox-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="share-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.engagementStats}>
              <Text style={styles.engagementText}>{card.likes} likes</Text>
              <Text style={styles.engagementText}>
                {card.comments} Comments
              </Text>
              <Text style={styles.engagementText}>{card.shares} Shares</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerText: {
    padding: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  tabItem: {
    padding: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    color: "#aaa",
  },
  activeTabText: {
    color: "#000",
  },
  feed: {
    flex: 1,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInfo: {
    flex: 1,
    marginLeft: 10,
  },
  profileName: {
    fontWeight: "bold",
  },
  postTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postTime: {
    marginLeft: 5,
    color: "#65676b",
  },
  followButton: {
    borderColor: "#1a77f2",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  followButtonText: {
    color: "#1a77f2",
    fontWeight: "bold",
  },
  optionsButton: {
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  liveBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  liveBadge: {
    backgroundColor: "red",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  liveText: {
    color: "white",
    fontSize: 12,
  },
  viewerCount: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 8,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  engagementStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  engagementText: {
    fontSize: 12,
  },
});
export default WatchScreen;
