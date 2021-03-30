import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";

export default function RequestRidePopUp({
  requestVisible,
  onDismiss,
}: {
  requestVisible: boolean;
  onDismiss: () => void;
}) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(requestVisible);
  }, [requestVisible]);
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
            onDismiss()
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
}
