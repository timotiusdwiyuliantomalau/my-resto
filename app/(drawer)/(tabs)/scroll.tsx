import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TextInput,
  Dimensions,
  Text,
  Image,
} from "react-native";

const HEADER_MAX_HEIGHT = Dimensions.get("window").height / 2;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SearchBarScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate header height and position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  // Calculate elements opacity for fade out effect
  const elementsOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Calculate search bar opacity
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        {/* Header Elements */}
        <Animated.View
          style={[
            styles.headerElements,
            {
              opacity: elementsOpacity,
            },
          ]}
        >
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "/api/placeholder/40/40" }}
              style={styles.profileImage}
            />
            <View style={styles.welcomeText}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.username}>John Doe</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>16</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          style={[
            styles.searchBarContainer,
            {
              opacity: searchBarOpacity,
            },
          ]}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Sample content */}
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.sampleContent}>
              <View style={styles.contentBox} />
            </View>
          ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "flex-end", // Align items to bottom
    paddingBottom: 10,
  },
  headerElements: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  searchBarContainer: {
    width: "90%",
    position: "absolute",
    bottom: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  sampleContent: {
    padding: 15,
    marginTop: HEADER_MAX_HEIGHT,
  },
  contentBox: {
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default SearchBarScreen;
