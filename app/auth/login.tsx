import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // FontAwesome for icons
import { Entypo } from "@expo/vector-icons";
import { ColorTheme } from "@/assets/colors";
import { useAuth } from "./auth_provider";

export default function LoginForm() {
  const { inputAuth, setInputAuth } = useAuth();

  return (
    <View style={styles.form}>
      {/* Login Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Input your email"
            placeholderTextColor="#9CA3AF" // Tailwind's gray-400
            style={styles.input}
            onChangeText={(value) =>
              setInputAuth({ ...inputAuth, email: value })
            }
            value={inputAuth.email}
          />
          <Entypo name="email" size={20} color={ColorTheme.GREEN} />
        </View>
      </View>

      {/* Password Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Input your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
            onChangeText={(value) =>
              setInputAuth({ ...inputAuth, password: value })
            }
            value={inputAuth.password}
          />
          <FontAwesome name="lock" size={22} color={ColorTheme.GREEN} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF", // White
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#374151", // Tailwind's gray-700
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB", // Tailwind's gray-300
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: "#374151", // Tailwind's gray-700
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
