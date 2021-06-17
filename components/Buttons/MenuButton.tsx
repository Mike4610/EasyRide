import React, { useEffect, useState } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface Props {
  onDismiss?: () => void;
  returnButton?: boolean;
  closeButton?: boolean;
  navigation?: any;
}

const MenuButton: React.FC<Props> = ({
  onDismiss,
  returnButton,
  closeButton,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        marginTop: 20,
        zIndex: 0,
        position: "absolute",
        //@ts-ignore
        top: StatusBar.currentHeight * 1.5,
        left: 20,
      }}
    >
      {closeButton ? (
        <AntDesign
          name="close"
          size={40}
          color="#fd4d4d"
          onPress={() => {
            if (onDismiss) onDismiss();
          }}
        />
      ) : returnButton ? (
        <Ionicons
          name="arrow-back"
          size={45}
          color="#fd4d4d"
          onPress={() => {
            if (onDismiss) onDismiss();
          }}
        />
      ) : !returnButton ? (
        <Ionicons
          name="menu"
          size={45}
          color="#fd4d4d"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default MenuButton;
