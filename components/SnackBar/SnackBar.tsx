import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}
const SnackBar: React.FC<Props> = ({ visible, message, onDismiss }) => {
  return (
    <View>
      <Snackbar
        duration={1500}
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "#151a21" }}
        action={{
          label: "",
          onPress: () => {
            onDismiss();
          },
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
          Invalid license plate!
        </Text>
      </Snackbar>
    </View>
  );
};

export default SnackBar;
