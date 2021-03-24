import React from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuButton({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        marginTop: 20,
        zIndex: 10,
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
}
