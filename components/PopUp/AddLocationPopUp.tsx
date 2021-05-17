import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dialog, Portal, Provider, Snackbar } from "react-native-paper";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import carList from "../../car-list.json";
import { Location } from "../../types";
import { licensePlateValidator } from "../../utils";
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
//   const seatNumbers = ["2", "3", "4", "5", "6", "7", "8"];
//   const [modelList, setModelList] = useState(carList[0].models);
//   const [vehicle, setVehicle] = useState({
//     brand: carList[0].brand,
//     model: carList[0].models[0],
//     seats: "2",
//     licensePlate: "",
//   });
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

//   const handleBrandChange = (itemValue: any) => {
//     carList.forEach(({ brand, models }) => {
//       if (brand === itemValue) {
//         setVehicle({
//           ...vehicle,
//           brand: brand,
//           model: models[0],
//         });

//         setModelList(models);
//       }
//     });
//   };

  const registerLocation = () => {
    // if (licensePlateValidator(vehicle.licensePlate) === "") {
    //   handleRegisterLocation(location);
    // }else{
    //   setSnackBarVisible(true)
    // }
  };

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
          {/* <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Invalid license plate!
          </Text> */}
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
