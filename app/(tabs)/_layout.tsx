import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import IconSymbol from "@expo/vector-icons/FontAwesome5";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors.dark.tint,
        headerShown: false,
        tabBarStyle: {
          paddingTop:3,
        },
        tabBarIconStyle: {
          height:20,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={21} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kambing"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={20} name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
