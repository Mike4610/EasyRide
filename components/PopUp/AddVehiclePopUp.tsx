import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dialog, Portal, Provider } from "react-native-paper";
import FullButton from "../../components/Buttons/FullButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AddVehicleContext } from "../../context/AddVehicleContext";
import carList from "../../car-list.json";

export default function AddVehiclePopUp({
  handleRegisterVehicle,
}: {
  handleRegisterVehicle: any;
}) {
  //@ts-ignore
  const { visible, setVisible } = useContext(AddVehicleContext);
  //PICKER
  const seatNumbers = ["2", "3", "4", "5", "6", "7", "8"];
  const [brand, setBrand] = useState(carList[0].brand);
  const [model, setModel] = useState(carList[0].models[0]);
  const [seats, setSeats] = useState("2");
  const [licensePlate, setLicensePlate] = useState("");
  const [modelList, setModelList] = useState(carList[0].models);

  const handleBrandChange = (itemValue: any) => {
    carList.forEach(({ brand, models }) => {
      if (brand === itemValue) {
        setBrand(brand);
        setModel(models[0]);
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
            setVisible(false);
          }}
        >
          <Dialog.Content>
            <KeyboardAwareScrollView style={{ height: 370 }}>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Brand</Text>
                <Picker
                  style={{ width: 250, height: 44 }}
                  itemStyle={{ height: 44 }}
                  selectedValue={brand}
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
                  selectedValue={model}
                  onValueChange={(itemValue) => setModel(itemValue)}
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
                  selectedValue={seats}
                  onValueChange={(itemValue) => setSeats(itemValue)}
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
                  onChangeText={(text) => setLicensePlate(text)}
                  value={licensePlate}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.buttons}>
              <FullButton
                press={() => {
                  handleRegisterVehicle(brand, model, seats, licensePlate);
                }}
                text={"Add"}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Provider>
  );
}

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
