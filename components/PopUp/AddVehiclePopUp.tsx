import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dialog, Portal, Provider } from "react-native-paper";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import carList from "../../car-list.json";
import { Vehicle } from "../../types";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  handleRegisterVehicle: (vehicle: Vehicle) => void;
}

const AddVehiclePopUp: React.FC<Props> = ({
  visible,
  onDismiss,
  handleRegisterVehicle,
}) => {
  //PICKER
  const seatNumbers = ["2", "3", "4", "5", "6", "7", "8"];
  const [modelList, setModelList] = useState(carList[0].models);
  const [vehicle, setVehicle] = useState({
    brand: carList[0].brand,
    model: carList[0].models[0],
    seats: "2",
    licensePlate: "",
  });

  const handleBrandChange = (itemValue: any) => {
    carList.forEach(({ brand, models }) => {
      if (brand === itemValue) {
        setVehicle({
          ...vehicle,
          brand: brand,
          model: models[0],
        });

        setModelList(models);
      }
    });
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
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Brand</Text>
                <Picker
                  style={{ width: 250, height: 44 }}
                  itemStyle={{ height: 44 }}
                  selectedValue={vehicle.brand}
                  onValueChange={(itemValue) => handleBrandChange(itemValue)}
                >
                  {carList.map(({ brand }) => {
                    return (
                      <Picker.Item key={brand} label={brand} value={brand} />
                    );
                  })}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Model</Text>
                <Picker
                  style={{ width: 250, height: 44 }}
                  itemStyle={{ height: 44 }}
                  selectedValue={vehicle.model}
                  onValueChange={(itemValue) => {
                    setVehicle({ ...vehicle, model: itemValue });
                  }}
                >
                  {modelList.map((item) => {
                    return <Picker.Item key={item} label={item} value={item} />;
                  })}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Seat number</Text>
                <Picker
                  style={{ width: 250, height: 44 }}
                  itemStyle={{ height: 44 }}
                  selectedValue={vehicle.seats}
                  onValueChange={(itemValue) => {
                    setVehicle({ ...vehicle, seats: itemValue });
                  }}
                >
                  {seatNumbers.map((number) => {
                    return (
                      <Picker.Item key={number} label={number} value={number} />
                    );
                  })}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>License Plate</Text>
                <TextInput
                  placeholder="AA-00-11"
                  placeholderTextColor="#151a21"
                  onChangeText={(text) => {
                    setVehicle({ ...vehicle, licensePlate: text });
                  }}
                  value={vehicle.licensePlate}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.buttons}>
              <Button
                full={true}
                press={() => {
                  handleRegisterVehicle(vehicle);
                }}
                text={"Add"}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default AddVehiclePopUp;

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
