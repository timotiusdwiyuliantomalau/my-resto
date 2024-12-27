import { firestore } from "@/firebase/initialize";
import * as SecureStore from "expo-secure-store";
import CryptoJS from "crypto-js";

import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { Alert } from "react-native";

export async function handleLogout() {
  await SecureStore.deleteItemAsync("user");
}

export async function handleRegister(data: any) {
  try {
    if (data.password != data.confirmPassword)
      return Alert.alert("Paswword and confirm password not match!");
    data.password = hashPassword(data.password);
    await addDoc(collection(firestore, "users"), {
      ...data,
      cart: [],
      address: null,
    });
    Alert.alert("Account has been created!");
  } catch (err: any) {
    Alert.alert(err.message);
  }
}
export async function handleLogin(inputAuth: any, callback: any) {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", inputAuth.email)
    );
    const snapshot = await getDocs(q);
    let users = snapshot.docs.map((user: any) => ({
      ...user.data(),
      id: user.id,
    }))[0];
    if (!users) {
      return Alert.alert("Email not found!");
    }
    if (users.password != hashPassword(inputAuth.password)) {
      return Alert.alert("Password not match!");
    }
    callback(users);
    users.cart = [];
    await SecureStore.setItemAsync("user", JSON.stringify(users), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  } catch (err: any) {
    Alert.alert(err.message);
  }
}

function hashPassword(password: string) {
  return CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
}
