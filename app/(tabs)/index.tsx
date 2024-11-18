import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import Star from "@expo/vector-icons/AntDesign";
import { getCategories, getLists } from "@/firebase/service.data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

const Homepage = () => {
  const [categories, setCategories] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    getCategories().then((res: any) => setCategories(res.data));
    getLists().then((res: any) => {
      AsyncStorage.setItem("listMenu", res.data);
      setList(JSON.parse(res.data));
    });
  }, []);

  async function handleSetCategory(category: string) {
    const list = await AsyncStorage.getItem("listMenu");
    const res = list && JSON.parse(list);
    const result = res.filter((item: any) => item.strCategory == category);
    setList(result);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Location Bar */}
        <View style={styles.locationBar}>
          <Icon name="bars" size={24} color="gray" />
          <View style={styles.locationText}>
            <Text style={styles.locationSubtext}>Location</Text>
            <Text style={styles.locationMain}>7ay El-Gamaa St., Mansoura</Text>
          </View>
          <Image
            source={{ uri: "https://picsum.com/40x40" }}
            style={styles.profileImage}
          />
        </View>

        {/* New Recipe */}
        <View style={styles.recipeCard}>
          <View style={styles.recipeContent}>
            <View>
              <Text style={styles.recipeTitle}>New Recipe</Text>
              <Text style={styles.recipeDescription}>
                Zesty shrimp seasoned with a savory blend of spices and herbs,
                served with a side of fresh vegetables.
              </Text>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://placehold.co/100x100" }}
              style={styles.recipeImage}
            />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Food, Side dishes, Drinks, etc..."
            style={styles.searchInput}
          />
          <Icon
            name="search"
            size={16}
            color="gray"
            style={styles.searchIcon}
          />
        </View>

        {/* Categories */}
        <View style={{ marginTop: 15 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories :</Text>
            <Text style={styles.sectionLink}>View All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {categories?.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => handleSetCategory(item.strCategory)}
                  key={index}
                  style={styles.categoryItem}
                >
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    style={styles.categoryImage}
                  />
                  <Text style={styles.categoryText}>{item.strCategory}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recommendations */}
        <View style={{ marginTop: 30 }}>
          <View style={[styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>Recommended For You :</Text>
            <Text style={styles.sectionLink}>View All</Text>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                columnGap: 10,
                gap: 20,
              }}
            >
              {list?.map((item: any, index: number) => (
                  <View key={index} style={styles.recommendationCard}>
                    <View style={styles.imageBadgeContainer}>
                      <Image
                        source={{ uri: item?.strMealThumb }}
                        style={styles.recommendationImage}
                      />
                      <Text
                        style={[
                          styles.recommendationBadge,
                          {
                            display:
                              item?.strTags?.split(",").length > 2
                                ? "flex"
                                : "none",
                          },
                        ]}
                      >
                        Recommended
                      </Text>
                    </View>
                    <Text style={styles.recommendationTitle}>
                      {item?.strMeal}
                    </Text>
                    <View style={styles.recommendationDetails}>
                      <View style={{ flexDirection: "row" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} name="star" size={12} color="yellow" />
                        ))}
                      </View>
                      <Text style={styles.recommendationMeta}>34 mins</Text>
                    </View>
                  </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3" },
  header: { paddingHorizontal: 18, backgroundColor: "#fff", borderRadius: 8 },
  statusText: { color: "gray" },
  statusIcons: { flexDirection: "row", gap: 8 },
  locationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  locationText: { alignItems: "center" },
  locationSubtext: { color: "gray" },
  locationMain: { fontWeight: "bold", fontSize: 16 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  recipeCard: {
    backgroundColor: "#007aff",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  recipeContent: { flexDirection: "row", justifyContent: "space-between" },
  recipeTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  recipeDescription: { color: "#fff", marginTop: 8 },
  orderButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  orderButtonText: { color: "#007aff", fontWeight: "bold" },
  recipeImage: { width: 80, height: 80, borderRadius: 40 },
  searchBar: { position: "relative", marginTop: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 8,
  },
  searchIcon: { position: "absolute", right: 16, top: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
  sectionLink: { color: "#007aff" },
  categoryItem: { alignItems: "center", marginRight: 16 },
  categoryImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  categoryText: { fontSize: 12 },
  recommendationCard: {
    width: "48%",
    height: 280,
    overflow: "hidden",
    borderWidth: 0.3,
    borderColor: "gray",
    borderRadius: 10,
    paddingBottom: 15,
  },
  imageBadgeContainer: { width: "100%", height: "80%", borderRadius: 8 },
  recommendationImage: { width: "100%", height: "100%", borderRadius: 8 },
  recommendationBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#007aff",
    color: "#fff",
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  recommendationTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10,
    textAlignVertical: "center",
    height: 40,
  },
  recommendationDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  recommendationMeta: { marginLeft: 8, fontSize: 10, color: "black" },
});

export default Homepage;
