import React, { useEffect, useState } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuButton({
  onDismiss,
  returnButton,
  navigation,
}: {
  onDismiss: () => void;
  returnButton: boolean;

  navigation: any;
}) {
  const [goBack, setGoBack] = useState(false);
  useEffect(() => {
    setGoBack(returnButton);
  }, [returnButton]);

  if (!goBack) {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginTop: 20,
          zIndex: 1,
          position: "absolute",
          //@ts-ignore
          top: StatusBar.currentHeight * 1.5,
          left: 20,
        }}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="menu" size={45} color="#fd4d4d" />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginTop: 20,
          zIndex: 1,
          position: "absolute",
          //@ts-ignore
          top: StatusBar.currentHeight * 1.5,
          left: 20,
        }}
        onPress={() => {
          onDismiss();
        }}
      >
        <Ionicons name="arrow-back" size={45} color="#fd4d4d" />
      </TouchableOpacity>
    );
  }
}
