import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "./auth/auth_provider";
import { ColorTheme } from "@/assets/colors";

export default function CartScreen() {
  const { cart, setCart } = useAuth();

  const updateQuantity = (setQuantity: any, type: any) => {
    setQuantity((prev: any) =>
      type === "increase" ? prev + 1 : prev > 0 ? prev - 1 : 0
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartContainer}>
        {/* Cart Items */}
        <View style={styles.itemContainer}>
          {cart &&
            cart.map((data: any) => (
              <View key={data.item.idMeal} style={styles.item}>
                <Image
                  source={{
                    uri: data.item.strMealThumb,
                  }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{data.item.strMeal}</Text>
                  <Text style={styles.itemPrice}>
                    $ {data.item.price * data.qty}
                  </Text>
                </View>
                <View style={styles.itemQuantity}>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text>{data.qty}</Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoContainer}>
          <TextInput style={styles.promoInput} placeholder="Promo Code" />
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <View style={styles.totalItem}>
            <Text>Subtotal</Text>
            <Text>$70.00</Text>
          </View>
          <View style={styles.totalItem}>
            <Text>Delivery</Text>
            <Text>$3.50</Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>$73.50</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", alignItems:"center",flex:1 },
  cartContainer: {
    padding: 24,
    width: "100%",
    flex:1,
    gap:20,
    // backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: "bold" },
  itemContainer: { marginBottom: 24 },
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  itemImage: { width: 50, height: 50, borderRadius: 25 },
  itemDetails: { flex: 1, marginLeft: 16 },
  itemName: { fontSize: 14, fontWeight: "bold" },
  itemPrice: { fontSize: 12, color: "gray" },
  itemQuantity: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    backgroundColor: "green",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    textAlign: "center",
  },
  promoContainer: {
    flexDirection: "row",
    backgroundColor: ColorTheme.YELLOW,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  promoInput: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight:500,
  },
  promoButton: {
    backgroundColor: "red",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  promoButtonText: { color: "white", fontWeight: "bold",fontSize:16 },
  totalContainer: { marginTop: 24, marginBottom: 16 },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: { fontWeight: "bold" },
  totalAmount: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: ColorTheme.BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
