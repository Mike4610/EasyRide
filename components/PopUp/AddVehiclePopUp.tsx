import React, { useState, useEffect, createRef } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Dialog,
  Divider,
  Portal,
  Provider,
  Snackbar,
} from "react-native-paper";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import carList from "../../car-list.json";
import { Vehicle } from "../../types";
import { licensePlateValidator } from "../../utils";
import ActionSheet from "react-native-actions-sheet";
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
  const [buttonText, setButtonText] = useState({
    brand: "Choose brand",
    model: "Choose model",
    seats: "Choose seat number",
  });
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const chooseBrandRef: React.RefObject<any> = createRef();
  const chooseModelRef: React.RefObject<any> = createRef();
  const chooseSeatNumber: React.RefObject<any> = createRef();

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const handleBrandChange = (itemValue: any) => {
    carList.forEach(({ brand, models }) => {
      if (brand === itemValue) {
        setVehicle({
          ...vehicle,
          brand: brand,
          model: models[0],
        });
        setModelList(models);
        setButtonText({ ...buttonText, brand: brand });
      }
    });
  };

  const registerVehicle = () => {
    if (licensePlateValidator(vehicle.licensePlate) === "") {
      handleRegisterVehicle(vehicle);
      setVehicle({
        brand: carList[0].brand,
        model: carList[0].models[0],
        seats: "2",
        licensePlate: "",
      });
    } else {
      setSnackBarVisible(true);
    }
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

                {Platform.OS === "ios" ? (
                  <>
                    <Button
                      text={buttonText.brand}
                      full={false}
                      press={() => {
                        chooseBrandRef.current?.setModalVisible();
                      }}
                    />
                    <ActionSheet ref={chooseBrandRef}>
                      <View>
                        <Picker
                          style={{
                            justifyContent: "center",
                            width: "100%",
                            height: 250,
                          }}
                          itemStyle={{ height: "100%" }}
                          selectedValue={vehicle.brand}
                          onValueChange={(itemValue) =>
                            handleBrandChange(itemValue)
                          }
                        >
                          {carList.map(({ brand }) => {
                            return (
                              <Picker.Item
                                key={brand}
                                label={brand}
                                value={brand}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </ActionSheet>
                  </>
                ) : (
                  <View>
                    <Picker
                      style={{ width: 250, height: 44 }}
                      itemStyle={{ height: 44 }}
                      selectedValue={vehicle.brand}
                      onValueChange={(itemValue) =>
                        handleBrandChange(itemValue)
                      }
                    >
                      {carList.map(({ brand }) => {
                        return (
                          <Picker.Item
                            key={brand}
                            label={brand}
                            value={brand}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                )}
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Model</Text>
                {Platform.OS === "ios" ? (
                  <>
                    <Button
                      text={buttonText.model}
                      full={false}
                      press={() => {
                        chooseModelRef.current?.setModalVisible();
                      }}
                    />
                    <ActionSheet ref={chooseModelRef}>
                      <Picker
                        style={{
                          justifyContent: "center",
                          width: "100%",
                          height: 250,
                        }}
                        itemStyle={{ height: "100%" }}
                        selectedValue={vehicle.model}
                        onValueChange={(itemValue) => {
                          setVehicle({ ...vehicle, model: itemValue });
                          setButtonText({ ...buttonText, model: itemValue });
                        }}
                      >
                        {modelList.map((item) => {
                          return (
                            <Picker.Item key={item} label={item} value={item} />
                          );
                        })}
                      </Picker>
                    </ActionSheet>
                  </>
                ) : (
                  <Picker
                    style={{ width: 250, height: 44 }}
                    itemStyle={{ height: 44 }}
                    selectedValue={vehicle.model}
                    onValueChange={(itemValue) => {
                      setVehicle({ ...vehicle, model: itemValue });
                    }}
                  >
                    {modelList.map((item) => {
                      return (
                        <Picker.Item key={item} label={item} value={item} />
                      );
                    })}
                  </Picker>
                )}
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Seat number</Text>
                {Platform.OS === "ios" ? (
                  <>
                    <Button
                      text={buttonText.seats}
                      full={false}
                      press={() => {
                        chooseSeatNumber.current?.setModalVisible();
                      }}
                    />
                    <ActionSheet ref={chooseSeatNumber}>
                      <Picker
                        style={{
                          justifyContent: "center",
                          width: "100%",
                          height: 250,
                        }}
                        itemStyle={{ height: "100%" }}
                        selectedValue={vehicle.seats}
                        onValueChange={(itemValue) => {
                          setVehicle({ ...vehicle, seats: itemValue });
                          setButtonText({ ...buttonText, seats: itemValue });
                        }}
                      >
                        {seatNumbers.map((number) => {
                          return (
                            <Picker.Item
                              key={number}
                              label={number}
                              value={number}
                            />
                          );
                        })}
                      </Picker>
                    </ActionSheet>
                  </>
                ) : (
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
                        <Picker.Item
                          key={number}
                          label={number}
                          value={number}
                        />
                      );
                    })}
                  </Picker>
                )}
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
                  registerVehicle();
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
            Invalid license plate!
          </Text>
        </Snackbar>
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
