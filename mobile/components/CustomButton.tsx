import { primaryColor } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type TButton = {
  height?: number;
  width?: number;
  title: string;
  color?: string;
  onPress?: (payload: any) => any;
  style?: object;
  loading?: boolean;
};

const CustomButton = ({
  height,
  width,
  title,
  color,
  onPress,
  style,
  loading,
}: TButton) => {
  const handleOnPress = (payload: any) => {
    if (!loading && onPress) {
      onPress(payload);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleOnPress}
      style={{
        height: height ? height : 52,
        width: width ? width : "100%",
        backgroundColor: color ? color : primaryColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 20,
            color: "white",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
