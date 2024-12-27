import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // FontAwesome for icons
import { LinearGradient } from "expo-linear-gradient";
import LoginForm from "./login";
import RegisterForm from "./register";
import { ColorTheme } from "@/assets/colors";
import { handleLogin, handleRegister } from "../../services/service.auth";
import { useAuth } from "./auth_provider";

export default function AuthScreen() {
  const [auth, setAuth] = React.useState("login");
  const { inputAuth, setIsLogin } = useAuth();

  return (
    <View style={styles.container}>
      {/* Wrapper */}
      <Image
        source={require("../../assets/images/auth-bg.jpg")}
        blurRadius={5}
        style={{
          width: "100%",
          height: "55%",
          position: "absolute",
          borderRadius: 10,
          top: -15,
        }}
      ></Image>
      <View style={styles.wrapper}>
        {/* Logo Section */}
        <View style={styles.titleForm}>
          <Text
            onPress={() => setAuth("login")}
            style={[styles.textTitle, { opacity: auth == "login" ? 1 : 0.5 }]}
          >
            Login
          </Text>
          <Text
            onPress={() => setAuth("register")}
            style={[
              styles.textTitle,
              { opacity: auth == "register" ? 1 : 0.5 },
            ]}
          >
            Register
          </Text>
        </View>
        {/* Choose Form */}
        {auth == "login" ? (
          <LoginForm></LoginForm>
        ) : (
          <RegisterForm></RegisterForm>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: ColorTheme.BLUE,
            paddingVertical: 8,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => {
            if (auth == "login") {
              handleLogin(inputAuth, (res: any) => {
                res && setIsLogin(true);
              });
            } else {
              handleRegister(inputAuth);
            }
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {auth == "login" ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Tailwind's gray-100
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    maxWidth: 350,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  titleForm: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    width: "50%",
    alignSelf: "center",
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "yellow",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 20,
    width: 90,
    textAlign: "center",
  },
  form: {
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
