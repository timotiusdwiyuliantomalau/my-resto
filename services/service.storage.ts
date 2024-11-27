import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
export async function getUserData(callback:(user:any)=>void) {
  const user = await SecureStore.getItemAsync("user");
  callback(user&&JSON.parse(user));
}
