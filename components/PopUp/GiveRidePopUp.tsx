import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";

interface Props {
  giveVisible: boolean;
  onDismiss: () => void;
}

const GiveRidePopUp: React.FC<Props> = ({ giveVisible, onDismiss }) => {
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
            onDismiss();
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
};
export default GiveRidePopUp;
