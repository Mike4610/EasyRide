import React, { useState, useContext } from "react";
import { FAB, Portal, Provider, Snackbar } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { CurrentRidesContext } from "../../context/CurrentRidesContext";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
interface Props {
  visible: boolean;
  onRequest: () => void;
  onGive: () => void;
}

const FabButton: React.FC<Props> = ({ visible, onRequest, onGive }) => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;
  const { viewRides, setViewRides } = useContext(CurrentRidesContext);
  const [snackVisible, setSnackVisible] = useState(false);

  const [
    getValue,
    setValue,
    removeValue,
    setRidesAsDriver,
    setRidesAsPassenger,
    getRidesAsDriver,
    getRidesAsPassenger,
  ] = useAsyncStorage();

  const checkUserRides = async () => {
    const driverArray = await getRidesAsDriver();
    const passangerArray = await getRidesAsPassenger();
    if (driverArray?.length || passangerArray?.length) return true;
    return false;
  };

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <FAB.Group
          fabStyle={visible ? stlyes.visibleFab : stlyes.invisibleFab}
          color="white"
          open={open}
          icon={open ? "close" : "plus"}
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
            {
              icon: viewRides ? "eye-off" : "eye",
              label: viewRides ? "Hide current rides" : "Show current rides",
              onPress: async () => {
                if (await checkUserRides()) {
                  setViewRides(!viewRides);
                } else {
                  setSnackVisible(true);
                }
              },
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
        <Snackbar
          duration={3000}
          visible={snackVisible}
          onDismiss={() => {
            setSnackVisible(false);
          }}
          style={{ backgroundColor: "#151a21" }}
          action={{
            label: "",
            onPress: () => {},
          }}
        >
          <Text>No rides to be shown...</Text>
        </Snackbar>
      </Portal>
    </Provider>
  );
};

export default FabButton;

const stlyes = StyleSheet.create({
  visibleFab: {
    backgroundColor: "#fd4d4d",
    marginBottom: 120,
    zIndex: 2,
  },
  invisibleFab: {
    backgroundColor: "#fd4d4d",
    marginBottom: 80,
    zIndex: 2,
    display: "none",
  },
});
