import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import React from "react";
import IconSymbol from "@expo/vector-icons/Ionicons";
import ActiveIcon from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red", // Warna saat tab aktif
        tabBarInactiveTintColor: "gray", // Warna saat tab tidak aktif
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "6%",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1%",
          // Pusatkan konten tab secara vertikal
        },
        tabBarItemStyle: {
          justifyContent: "center", // Pastikan item berada di tengah secara vertikal
          alignItems: "center", // Pusatkan item secara horizontal
        },
        headerLeft: () => <DrawerToggleButton tintColor="red" />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color,focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <IconSymbol size={26} name="home" color={color} />
              <ActiveIcon name="circle" style={{display:focused?"flex":"none"}} size={6} color={color}></ActiveIcon>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
            tabBarIcon: ({ color,focused }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconSymbol size={28} name="compass" color={color} />
                  <ActiveIcon name="circle" style={{display:focused?"flex":"none"}} size={6} color={color}></ActiveIcon>
                </View>
              ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
            tabBarIcon: ({ color,focused }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconSymbol size={28} name="cart" color={color} />
                  <ActiveIcon name="circle" style={{display:focused?"flex":"none"}} size={6} color={color}></ActiveIcon>
                </View>
              ),
        }}
      />
    </Tabs>
  );
}
