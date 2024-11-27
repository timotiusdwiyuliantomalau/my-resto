import React from "react";
import AuthScreen from "./auth";
import NavigationBar from "./header-footer/header";
import { Stack } from "expo-router";
import TabBar from "./header-footer/footer";
import { useAuth } from "./auth/auth_provider";
import { getUserData } from "@/services/service.storage";

export default function App() {
  const { isLogin, setIsLogin } = useAuth();
  React.useEffect(() => {
    getUserData((res) => {
      if (res) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return (
    <>
      {typeof isLogin != "undefined" && isLogin == false && (
        <AuthScreen></AuthScreen>
      )}
      {typeof isLogin != "undefined" && isLogin == true && (
        <>
          <NavigationBar></NavigationBar>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="detail" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <TabBar></TabBar>
        </>
      )}
    </>
  );
}
