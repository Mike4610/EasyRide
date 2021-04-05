import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";

interface Props {
  requestVisible: boolean;
  onDismiss: () => void;
}
const RequestRidePopUp: React.FC<Props> = ({ requestVisible, onDismiss }) => {
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
            onDismiss();
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
};

export default RequestRidePopUp;
