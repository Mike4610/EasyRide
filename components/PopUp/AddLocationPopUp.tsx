import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dialog, Portal, Provider, Snackbar } from "react-native-paper";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Location, Place } from "../../types";
import SearchBar from "../SearchBar/SearchBar";
interface Props {
  visible: boolean;
  onDismiss: () => void;
  handleRegisterLocation: (location: Location) => void;
}

const AddLocationPopUp: React.FC<Props> = ({
  visible,
  onDismiss,
  handleRegisterLocation,
}) => {
  //PICKER
  const [location, setLocation] = useState({
    name: "",
    place: {} as Place,
  });
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const registerLocation = () => {
    if (location.name != "" && Object.keys(location.place).length != 0) {
      handleRegisterLocation(location);
    } else {
      console.log(location);
      setSnackBarVisible(true);
    }
  };

  useEffect(() => {
    console.log(location.place);
  }, [location.place]);

  return (
    <Provider>
      <Portal>
        <Dialog
          style={styles.popup}
          visible={visible}
          onDismiss={() => {
            onDismiss();
          }}
        >
          <Dialog.Content>
            <KeyboardAwareScrollView style={{ height: 370 }}>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Name</Text>
                <TextInput
                  placeholder="Home"
                  placeholderTextColor="#151a21"
                  onChangeText={(text) => {
                    setLocation({ ...location, name: text });
                  }}
                  value={location.name}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>

              <View style={{ height: 500 }}>   
                <View style={styles.pickerContainer}>
                  <Text style={styles.popup_title}>Location</Text>
                  <View
                    style={{
                      width: 380,
                      alignSelf: "center",
                      // zIndex: 0,
                      position: "absolute",
                    }}
                  >
                    <SearchBar
                      location={location.place}
                      placeholder="Location"
                      visible={true}
                    ></SearchBar>
                  </View>
                </View>
              </View>

            </KeyboardAwareScrollView>
            <View style={styles.buttons}>
              <Button
                full={true}
                press={() => {
                  registerLocation();
                }}
                text={"Add"}
              />
            </View>
          </Dialog.Content>
        </Dialog>
        <Snackbar
          duration={1500}
          visible={snackBarVisible}
          onDismiss={dismissSnackBar}
          style={{ backgroundColor: "#151a21" }}
          action={{
            label: "",
            onPress: () => {
              dismissSnackBar();
            },
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Unable to set new Location!
          </Text>
        </Snackbar>
      </Portal>
    </Provider>
  );
};

export default AddLocationPopUp;

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
