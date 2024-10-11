import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserState = {
  isLoggedIn: boolean;
  token: string;
  data: any;
};

type ProviderValueType = {
  user?: UserState | null;
  loading?: boolean;
  storeUser?: (payload: UserState) => void;
  resetUser?: () => void;
};

const AuthContext = createContext<ProviderValueType>({});
const { Provider } = AuthContext;

const initState: UserState = {
  isLoggedIn: false,
  data: null,
  token: "",
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserState | null>(initState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user");
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Error loading user data", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const storeUser = async (payload: UserState) => {
    setUser(payload);
    await AsyncStorage.setItem("user", JSON.stringify(payload));
    if (payload.token) {
      await AsyncStorage.setItem("token", payload.token);
    }
  };

  const resetUser = async () => {
    setUser({ ...initState });
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <Provider value={{ loading, user, storeUser, resetUser }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
