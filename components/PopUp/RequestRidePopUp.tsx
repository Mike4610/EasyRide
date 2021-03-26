import React, { useState, useContext } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { RequestRideContext } from "../../context/RequestRideContext";

export default function RequestRidePopUp() {
  //@ts-ignore
  const { visible, setVisible } = useContext(RequestRideContext);

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            width: 300,
            height: 450,
            alignSelf: "center",
          }}
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
}
