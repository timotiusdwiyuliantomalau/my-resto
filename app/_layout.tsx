import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import NavigationBar from "./header-footer/header";
import TabBar from "./header-footer/footer";
import AuthScreen from "./auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLogin, setIsLogin] = React.useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isLogin ? (
        <AuthScreen></AuthScreen>
      ) : (
        <>
          <NavigationBar></NavigationBar>
          <Stack>
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
              
            />
            <Stack.Screen name="detail" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <TabBar></TabBar>
        </>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
