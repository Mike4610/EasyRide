import React, { useState, useEffect } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import {StyleSheet} from 'react-native'
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function FabButton({
  visible,
  onRequest,
  onGive,
}: {
  visible: boolean;
  onRequest: () => void;
  onGive: () => void;
}) {
  const [state, setState] = useState({ open: false });
  const [isVisible, setIsVisible] = useState(true)
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <FAB.Group
          fabStyle={isVisible ? stlyes.visibleFab : stlyes.invisibleFab}
          color="white"
          open={open}
          icon={"plus"}
          actions={[
            {
              icon: "car-hatchback",
              label: "Give a ride",
              onPress: onGive,
            },
            {
              icon: "map-marker",
              label: "I need a ride",
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

const stlyes = StyleSheet.create({
  visibleFab:{
    backgroundColor: "#fd4d4d",
    marginBottom: 80,
    zIndex: 2,
  },
  invisibleFab: {
    backgroundColor: "#fd4d4d",
    marginBottom: 80,
    zIndex: 2,
    display: "none"
  }
})


