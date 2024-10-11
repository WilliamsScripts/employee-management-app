import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/utils/formatDate";

type TCustomDatePicker = {
  title?: string;
  placeholder: string;
  style?: object;
  lightColor?: string;
  darkColor?: string;
  onchange: (date: Date) => void;
  value?: Date;
  error?: string;
};

const CustomDatePicker: React.FC<TCustomDatePicker> = ({
  title,
  style,
  lightColor,
  darkColor,
  value,
  error,
  onchange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const handleDateToggle = () => setShowDatePicker((prev) => !prev);

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
      <TouchableOpacity activeOpacity={1} onPress={handleDateToggle}>
        <ThemedView
          style={{
            position: "relative",
            height: 52,
            width: "100%",
            backgroundColor,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 16,
            borderRadius: 8,
            justifyContent: "center",
          }}
        >
          <ThemedText>{formatDate(value) ?? "Select Date"}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
      {error && (
        <ThemedText
          type="defaultSemiBold"
          style={{ color: "red", marginTop: 5 }}
        >
          {error}
        </ThemedText>
      )}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={value && new Date(value)}
        onChange={onchange}
        onConfirm={(date) => {
          onchange(date);
          handleDateToggle();
        }}
        onCancel={handleDateToggle}
      />
    </View>
  );
};

export default CustomDatePicker;
