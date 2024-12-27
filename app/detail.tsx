import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import UserData from "../type-data/type";
import { handleAddToCart } from "@/firebase/service.data";
import { getUserData } from "@/services/service.storage";
import { useAuth } from "./auth/auth_provider";

export default function DetailPage() {
  const { data } = useLocalSearchParams();
  const item = typeof data == "string" && JSON.parse(data);
  const [quantity, setQuantity] = useState(1);
  const [userData, setUserData] = useState<UserData>();
  const {cart,setCart}=useAuth();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  React.useEffect(() => {
    getUserData((res) => setUserData(res));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.strMeal}</Text>
        <View style={styles.categoryItem}>
          {item.strTags ? (
            item.strTags.split(",").map((data: any, index: number) => (
              <Text style={styles.textCategory} key={index}>
                {data}
              </Text>
            ))
          ) : (
            <Text>{item.strCategory}</Text>
          )}
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>$ {item.price*quantity}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={24} color="yellow" />
            <Text style={styles.infoText}>{item.rating}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flame" size={24} color="red" />
            <Text style={styles.infoText}>150 Kcal</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={24} color="red" />
            <Text style={styles.infoText}>{item.duration}</Text>
          </View>
        </View>
        <Text style={styles.description}>
          {item.strInstructions.split(".")[0]}
        </Text>
        <TouchableOpacity onPress={() => {userData&&handleAddToCart(cart,userData.id,item,quantity,(result:any)=>setCart(result))}} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  textCategory: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280", // gray-500
    textAlign: "center",
  },
  cheeseIcon: {
    color: "#fbbf24", // yellow-500
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  quantityButton: {
    backgroundColor: "#ef4444", // red-500
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444", // red-500
    textAlign: "center",
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 5,
    color: "#374151", // gray-700
  },
  description: {
    color: "#6b7280", // gray-500
    textAlign: "center",
    marginVertical: 10,
  },
  readMore: {
    color: "#ef4444", // red-500
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#ef4444", // red-500
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
