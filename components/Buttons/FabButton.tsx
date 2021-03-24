import React from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function FabButton() {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: any }) => setState({ open });
  
    const { open } = state;
  return (
    <Provider>
        <Portal>
          {/* @ts-ignore */}
          <FAB.Group
            fabStyle={{ backgroundColor: "#fd4d4d", marginBottom: 50 }}
            color="white"
            open={open}
            icon={"plus"}
            actions={[
              {
                icon: "check",
                label: "Give Ride",
                onPress: () => console.log("Pressed star"),
              },
              {
                icon: "pin",
                label: "Request Ride",
                onPress: () => console.log("Pressed email"),
              },
              {
                icon: "car",
                label: "Register Vehicle",
                onPress: () => console.log("Pressed notifications"),
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
