import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";

interface Props {
  requestVisible: boolean;
  onDismiss: () => void;
}

const RequestRidePopUp: React.FC<Props> = ({ requestVisible, onDismiss }) => {

  // <Provider>
  // <Portal>
  //   <Dialog
  //     style={styles.popup}
  //     visible={visible}
  //     onDismiss={() => {
  //       onDismiss();
  //     }}
  //   >

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={styles.popup}
          visible={requestVisible}
          onDismiss={() => {
            onDismiss();
          }}
        ></Dialog>
        <Dialog.Content>
          <KeyboardAwareScrollView style={{ height: 370 }}>
            <View style={styles.pickerContainer}>
              {/* <Text style={styles.popup_title}>To?</Text> */}
            </View>
          </KeyboardAwareScrollView>
        </Dialog.Content>
      </Portal>
    </Provider>
  );
};

export default RequestRidePopUp;

const styles = StyleSheet.create({
  buttons: {
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 500,
    alignSelf: "center",
  },
  pickerContainer: {
    alignItems: "center",
    height: 120,
    padding: 20,
  },
  textInput: {
    height: 40,
    width: 250,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
    alignSelf: "center",
  },
  popup_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
