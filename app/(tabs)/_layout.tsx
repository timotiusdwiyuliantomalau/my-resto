import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import IconSymbol from "@expo/vector-icons/Ionicons";
import ActiveIcon from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors.dark.tint,
        headerShown: false,
        tabBarStyle: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 60,
          paddingTop:5,
        },
        tabBarLabel: ({color}) => (
          <ActiveIcon
            name="circle"
            style={{ display: color==Colors.dark.tint?"none":"flex" }}
            size={6}
            color="red"
          ></ActiveIcon>
        ),
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol name={focused?"home-sharp":"home-outline"} style={{marginTop:!focused?10:0,height:20}} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kambing"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused?"cart":"cart-outline"} style={{marginTop:!focused?10:0,height:20}} size={27} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="detail"   options={{
    tabBarButton: () => null, // Hides the tab button
    tabBarStyle: { display: 'none' }, // Ensures it won't show
  }}
 />
    </Tabs>
  );
}
