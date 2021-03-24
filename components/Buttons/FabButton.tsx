import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function FabButton() {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any }) => setState({ open });
  const { open } = state;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <FAB.Group
          fabStyle={{
            backgroundColor: "#fd4d4d",
            marginBottom: 50,
            zIndex: 30,
          }}
          color="white"
          open={open}
          icon={"plus"}
          actions={[
            {
              icon: "check",
              label: "Give a Ride",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "pin",
              label: "Request a Ride",
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "car",
              label: "Register a Vehicle",
              onPress: () => setModalVisible(!modalVisible),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
}
