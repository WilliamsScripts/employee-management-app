import { FontAwesome5 } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";

export default function EmployeeLayout() {
  const goBack = () => router.back();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-employee"
        options={{
          headerTitle: "Add New Employee",
          presentation: "modal",
          headerRight: () => (
            <View>
              {Platform.OS === "ios" && (
                <TouchableOpacity onPress={goBack}>
                  <FontAwesome5 name="times-circle" size={24} color="grey" />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          headerTitle: "Edit Employee Info",
          presentation: "modal",
          headerRight: () => (
            <View>
              {Platform.OS === "ios" && (
                <TouchableOpacity onPress={goBack}>
                  <FontAwesome5 name="times-circle" size={24} color="grey" />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
    </Stack>
  );
}
