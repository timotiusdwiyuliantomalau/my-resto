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
import { handleRegister } from "../../services/service.auth";
import { useAuth } from "./auth_provider";

export default function RegisterForm() {
  const { inputAuth, setInputAuth } = useAuth();

  function handleSetInput(key: keyof typeof inputAuth, value: string) {
    setInputAuth({ ...inputAuth,[key]: value });
  }

  return (
    <View style={styles.form}>
      {/* Name Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={inputAuth.name}
            onChangeText={(value) => handleSetInput("name", value)}
            placeholderTextColor="#9CA3AF" // Tailwind's gray-400
            style={styles.input}
          />
          <FontAwesome name="user" size={20} color={ColorTheme.GREEN} />
        </View>
      </View>
      {/* Login Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={inputAuth.email}
            keyboardType="email-address"
            onChangeText={(value) => handleSetInput("email", value)}
            placeholderTextColor="#9CA3AF" // Tailwind's gray-400
            style={styles.input}
          />
          <Entypo name="email" size={20} color={ColorTheme.GREEN} />
        </View>
      </View>

      {/* Password Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={inputAuth.password}
            onChangeText={(value) => handleSetInput("password", value)}
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
          />
          <FontAwesome name="lock" size={22} color={ColorTheme.GREEN} />
        </View>
      </View>
      {/* Password Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={inputAuth.confirmPassword}
            onChangeText={(value) => handleSetInput("confirmPassword", value)}
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
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
