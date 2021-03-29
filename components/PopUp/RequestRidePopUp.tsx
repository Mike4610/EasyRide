import React, { useState, useContext } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { RequestRideContext } from "../../context/PopUpContext";

export default function RequestRidePopUp() {
  //@ts-ignore
  const { requestVisible, setRequestVisible } = useContext(RequestRideContext);

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
          visible={requestVisible}
          onDismiss={() => {
            setRequestVisible(false);
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
}
