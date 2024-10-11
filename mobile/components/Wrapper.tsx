import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

const Wrapper: React.FC<{
  children: React.ReactNode;
  paddingBottom?: number;
}> = ({ paddingBottom, children }) => {
  const [keyboardState, setKeyboardState] = useState<boolean>(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardState(true);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardState(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            paddingBottom:
              Platform.OS === "android" && keyboardState
                ? paddingBottom ?? 10
                : 0,
          }}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Wrapper;
