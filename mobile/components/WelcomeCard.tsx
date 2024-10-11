import React, { useContext } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const WelcomeCard = () => {
  const { user, resetUser } = useContext(AuthContext);

  const handleLogout = () => {
    resetUser && resetUser();
    router.replace("/login");
  };

  return (
    <ThemedView style={[styles.header, { backgroundColor: "transparent" }]}>
      <View>
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 5 }}>
          Welcome👋
        </ThemedText>
        <ThemedText type="title">{user?.data?.name}</ThemedText>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={handleLogout}>
        <Feather name="log-out" size={24} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginBottom: 5,
    marginTop: Platform.OS === "android" ? 50 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default WelcomeCard;
