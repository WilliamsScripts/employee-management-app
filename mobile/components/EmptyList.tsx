import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const EmptyList = () => {
  const iconColor = useThemeColor({}, "icon");
  const color = useThemeColor({}, "text");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
      }}
    >
      <AntDesign name="folderopen" size={100} color={iconColor} />
      <ThemedText type="subtitle" style={{ color }}>
        No Record Found
      </ThemedText>
      <ThemedText>Click the plus button below to add your employees</ThemedText>
    </View>
  );
};

export default EmptyList;
