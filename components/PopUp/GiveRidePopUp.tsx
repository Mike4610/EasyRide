import React, { useState, useContext } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { GiveRideContext } from "../../context/GiveRideContext";

export default function GiveRidePopUp() {
  //@ts-ignore
  const { giveVisible, setGiveVisible } = useContext(GiveRideContext);

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
          visible={giveVisible}
          onDismiss={() => {
            setGiveVisible(false);
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
}
