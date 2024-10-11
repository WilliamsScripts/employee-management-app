import React, { useEffect, useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

type TInput = {
  title?: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
  style?: object;
  lightColor?: string;
  darkColor?: string;
  onChange?: (newValue: string) => void;
  value?: string;
  error?: string;
  search?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const CustomInput: React.FC<TInput> = ({
  title,
  placeholder,
  type,
  lightColor,
  darkColor,
  style,
  onBlur,
  onChange,
  error,
  value,
  search,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  useEffect(() => {
    if (!type) {
      setSecureTextEntry(true);
    }
  }, [type]);

  const handlePasswordVisibility = () => setSecureTextEntry((prev) => !prev);

  return (
    <View style={style}>
      {title && (
        <ThemedText
          style={{
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 20,
            marginBottom: 10,
          }}
        >
          {title}
        </ThemedText>
      )}
      <View style={{ position: "relative" }}>
        <TextInput
          keyboardType={type}
          style={{
            position: "relative",
            height: 52,
            width: "100%",
            color,
            backgroundColor,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
          placeholderTextColor={color}
          placeholder={placeholder}
          onBlur={onBlur && onBlur}
          onChangeText={(value) => onChange && onChange(value)}
          value={value}
          {...{ secureTextEntry }}
        />
        {search && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: 52,
              width: 52,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="search" size={24} color="#444444B2" />
          </TouchableOpacity>
        )}
        {!type && (
          <TouchableOpacity
            onPress={handlePasswordVisibility}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: 52,
              width: 52,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather
              name={secureTextEntry ? "eye" : "eye-off"}
              size={24}
              color="#444444B2"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText
          type="defaultSemiBold"
          style={{ color: "red", marginTop: 5 }}
        >
          {error}
        </ThemedText>
      )}
    </View>
  );
};

export default CustomInput;
