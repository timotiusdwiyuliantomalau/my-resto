import { handleLogout } from "@/services/service.auth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import React from "react";
import { useAuth } from "@/app/auth/auth_provider";

const CustomDrawer = (props: any) => {
  const { setIsLogin } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={"Profile"} onPress={() => {}}></DrawerItem>
      <DrawerItem
        label={"Logout"}
        onPress={() => {
          handleLogout();
          setIsLogin(false);
        }}
      ></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Drawer.Screen>
    </Drawer>
  );
}
