import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { handleLogout } from "@/services/service.auth";
import React from "react";
import { useAuth } from "../auth/auth_provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function NavigationBar() {
  const { setIsLogin } = useAuth();

  return (
    <View style={styles.container}>
      {/* Location Bar */}
      <View style={styles.locationBar}>
        <Icon name="bars" size={24} color="gray" />
        <View style={styles.locationText}>
          <Text style={styles.locationSubtext}>Location</Text>
          <Text style={styles.locationMain}>Pamengkang</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsLogin(false);
            handleLogout();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 15,
  },
  locationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    alignItems: "center",
    width: "90%",
  },
  locationText: { alignItems: "center" },
  locationSubtext: { color: "white" },
  locationMain: { fontWeight: "bold", fontSize: 16 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
});
