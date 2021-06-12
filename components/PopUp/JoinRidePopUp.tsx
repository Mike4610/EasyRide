import React, { useState, useEffect } from "react";
import {
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { Route } from "../../types";

interface Props {
  visible: boolean;
  route: Route;
}

const LoadingPopUp: React.FC<Props> = ({ visible, route }) => {
  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            width: 200,
            height: 200,
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          visible={visible}
        >
          <Text style={{ fontSize: 14, color: "#151a21", marginTop: 30 }}>
            {route.from.description}
          </Text>
        </Dialog>
      </Portal>
    </Provider>
  );
};
export default LoadingPopUp;
