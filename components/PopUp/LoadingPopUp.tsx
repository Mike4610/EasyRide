import React, { useState, useEffect } from "react";
import {
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  loading?: boolean;
  error?: boolean;
  correct?: boolean;
  message?: string;
}

const LoadingPopUp: React.FC<Props> = ({
  loading,
  correct,
  error,
  visible,
  message,
}) => {
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
          {loading ? (
            <>
              <ActivityIndicator animating={true} color={"#fd4d4d"} />
            </>
          ) : correct ? (
            <AntDesign name="check" size={34} color={"#fd4d4d"} />
          ) : (
            error && <Feather name="x" size={34} color={"#fd4d4d"} />
          )}
          <Text style={{ fontSize: 14, color: "#151a21", marginTop: 30 }}>
            {message}
          </Text>
        </Dialog>
      </Portal>
    </Provider>
  );
};
export default LoadingPopUp;
