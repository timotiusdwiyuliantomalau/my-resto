import { getCart } from "@/firebase/service.data";
import { getUserData } from "@/services/service.storage";
import * as SecureStore from "expo-secure-store";
import React from "react";

const AuthContext = React.createContext<any>(undefined);
export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const [inputAuth, setInputAuth] = React.useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = React.useState<any>(undefined);
  const [cart, setCart] = React.useState<any>([]);
  const initializeCart = async () => {
    const data = await SecureStore.getItemAsync("user");
    getCart(data&&JSON.parse(data).id, (res: any) => setCart(res));
  };
  React.useEffect(() => {
    initializeCart();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ inputAuth, setInputAuth, isLogin, setIsLogin, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
