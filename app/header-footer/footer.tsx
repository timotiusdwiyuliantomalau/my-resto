import { Text, View } from "react-native";
import IconSymbol from "@expo/vector-icons/Ionicons";
import ActiveIcon from "@expo/vector-icons/FontAwesome";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";

export default function TabBar() {
  const [tabs, setTabs] = React.useState("index");
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "6%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
        alignSelf: "center",
      }}
    >
      <Link
        onPress={() => setTabs("index")}
        href={{ pathname: "./" }}
        style={{ alignItems: "center" }}
      >
        <View style={{ justifyContent: "center" }}>
          <IconSymbol
            style={{
              width: 30,
              height: 30,
              textAlign: "center",
              textAlignVertical: "bottom",
            }}
            size={25}
            color={"red"}
            name="home"
          ></IconSymbol>
          <ActiveIcon
            style={{
              textAlign: "center",
              display: tabs == "index" ? "flex" : "none",
            }}
            name="circle"
            size={6}
            color="red"
          ></ActiveIcon>
        </View>
      </Link>
      <Link
        onPress={() => setTabs("search")}
        href={{ pathname: "./search" }}
        style={{ alignItems: "center" }}
      >
        <View style={{ justifyContent: "center" }}>
          <IconSymbol
            style={{
              width: 30,
              height: 30,
              textAlign: "center",
              textAlignVertical: "bottom",
            }}
            size={26}
            color={"red"}
            name="search"
          ></IconSymbol>
          <ActiveIcon
            style={{
              textAlign: "center",
              display: tabs == "search" ? "flex" : "none",
            }}
            name="circle"
            size={6}
            color="red"
          ></ActiveIcon>
        </View>
      </Link>
      <Link
        onPress={() => setTabs("cart")}
        href={{ pathname: "./cart" }}
        style={{ alignItems: "center" }}
      >
        <View style={{ justifyContent: "center" }}>
          <IconSymbol
            style={{
              width: 30,
              height: 30,
              textAlign: "center",
              textAlignVertical: "bottom",
            }}
            size={29}
            color={"red"}
            name="cart"
          ></IconSymbol>
          <ActiveIcon
            style={{
              textAlign: "center",
              display: tabs == "cart" ? "flex" : "none",
            }}
            name="circle"
            size={6}
            color="red"
          ></ActiveIcon>
        </View>
      </Link>
    </View>
  );
}
