import React, { useState } from "react";
import { View } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function FabButton({
  onRequest,
  onGive,
}: {
  onRequest: () => void;
  onGive: () => void;
}) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <FAB.Group
          fabStyle={{
            backgroundColor: "#fd4d4d",
            marginBottom: 120,
            zIndex: 2,
          }}
          color="white"
          open={open}
          icon={"plus"}
          actions={[
            {
              icon: "car-hatchback",
              label: "Give a Ride",
              onPress: onGive,
            },
            {
              icon: "map-marker",
              label: "Request a Ride",
              onPress: onRequest,
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
