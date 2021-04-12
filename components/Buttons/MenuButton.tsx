import React, { useEffect, useState } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onDismiss?: () => void;
  returnButton?: boolean;
  navigation: any;
}

const MenuButton: React.FC<Props> = ({
  onDismiss,
  returnButton,
  navigation,
}) => {
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
    >
      {!returnButton ? (
        <Ionicons
          name="menu"
          size={45}
          color="#fd4d4d"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : (
        <Ionicons
          name="arrow-back"
          size={45}
          color="#fd4d4d"
          onPress={() => {
            if(onDismiss)
              onDismiss();
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default MenuButton;
