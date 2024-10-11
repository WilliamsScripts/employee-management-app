import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: "(employees)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <ProtectedRoute>
                <Stack>
                  <Stack.Screen
                    name="(employees)"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="login"
                    options={{
                      headerShown: false,
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen
                    name="sign-up"
                    options={{
                      headerShown: false,
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen
                    name="+not-found"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ProtectedRoute>
            </QueryClientProvider>
          </SafeAreaProvider>
        </AuthProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
