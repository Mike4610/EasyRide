import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";

export default function EditProfilePopUp({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

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
          visible={isVisible}
          onDismiss={() => {
            onDismiss()
          }}
        ></Dialog>
      </Portal>
    </Provider>
  );
}
