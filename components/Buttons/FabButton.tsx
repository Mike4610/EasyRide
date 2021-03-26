import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function FabButton({onRequest, onGive}:{onRequest:any, onGive:any}) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any }) => setState({ open });
  const { open } = state;

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <FAB.Group
          fabStyle={{
            backgroundColor: "#fd4d4d",
            marginBottom: 50,
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
