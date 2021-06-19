import React, { useState, useEffect, useContext, createRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { Dialog, Portal, Provider, Snackbar } from "react-native-paper";
import { Dimensions } from "react-native";
import SearchBar from "../SearchBar/SearchBar";
import { Divider } from "react-native-paper";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import DatePicker from "@react-native-community/datetimepicker";
import Button from "../Buttons/Button";
import { Picker } from "@react-native-picker/picker";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { Place, User, Vehicle } from "../../types";
import { Route } from "../../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteContext } from "../../context/RouteContext";
import ActionSheet from "react-native-actions-sheet";
import { dateValidator, validateLocation } from "../../utils";
import { VehicleContext } from "../../context/VehicleContext";
import { useIsFocused } from "@react-navigation/native";

interface Props {
  giveVisible: boolean;
  onDismiss: () => void;
}

const GiveRidePopUp: React.FC<Props> = ({ giveVisible, onDismiss }) => {
  const [mode, setMode] = useState("date");
  const isFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState({
    car: "Choose vehicle",
    seats: "Choose seat number",
  });
  const chooseCarRef = createRef();
  const chooseSeatNumberRef = createRef();

  const [titleDate, setTitleDate] = useState("Select Time and Date");
  const [titleD, setTitleD] = useState("");
  const [titleTime, setTitleTime] = useState("");

  const [userData, setUserData] = useState<User>({
    id: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    createdAt: "",
    vehicles: [],
    locations: [],
  });
  const [getValue] = useAsyncStorage();

  const initialState: Route = {
    id: "",
    from: {} as Place,
    to: {} as Place,
    date: new Date(),
    duration: 0,
    distance: 0,
    vehicle: {} as Vehicle,
    availableSeats: "",
    driverId: "",
  };

  let auxDate = new Date();

  const [vehicleC, setVehicleC] = useState({
    label: "",
    seats: [] as string[] | undefined,
  });

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const [routeDetails, setRouteDetails] = useState<Route>(initialState);

  const { route, setRoute } = useContext(RouteContext);
  const { vehicle, setVehicle } = useContext(VehicleContext);

  useEffect(() => {
    (async () => {
      const user = await getValue();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user = await getValue();
      setUserData(user);
    })();
  }, [isFocused]);

  const forceUpdate: () => void = React.useState()[1].bind(null, {});

  useEffect(() => {
    setRouteDetails({
      id: "",
      from: {} as Place,
      to: {} as Place,
      date: new Date(),
      duration: 0,
      distance: 0,
      driverId: userData.id,
      passengersId: [] as string[],
      vehicle: userData?.vehicles[0],
      availableSeats: String(parseInt(userData.vehicles[0]?.seats) - 1),
    });
    setVehicle({
      label: userData.vehicles[0]?.brand + " " + userData.vehicles[0]?.model,
      seats: getSeatNumber(userData.vehicles[0]?.seats),
    });
  }, [route]);

  useEffect(() => {
    setVehicle({
      label: userData.vehicles[0]?.brand + " " + userData.vehicles[0]?.model,
      seats: getSeatNumber(userData.vehicles[0]?.seats),
    });
    setRouteDetails({
      ...routeDetails,
      driverId: userData.id,
      passengersId: [] as string[],
      vehicle: userData.vehicles[0],
      availableSeats: String(parseInt(userData.vehicles[0]?.seats) - 1),
    });
  }, [userData]);

  useEffect(() => {
    if (titleD == "" || titleTime == "") {
      setTitleDate("Select Time and Date");
    } else {
      setTitleDate("Date : " + titleD + " Time : " + titleTime.slice(0, 5));
    }
  }, [titleTime]);

  useEffect(() => {
    console.log(JSON.stringify(routeDetails.date));
  }, [routeDetails]);

  const onChange = (event: Event, selectedDate?: Date) => {
    setShow(Platform.OS === "android");
    console.log(selectedDate);
    if (selectedDate) {
      setRouteDetails({
        ...routeDetails,
        date: selectedDate,
      });
    }
  };

  const getSeatNumber = (s: string) => {
    if (s !== undefined) {
      let availableSeats: number = parseInt(s);
      let seatsArray = [...Array(availableSeats)].map((item, index) =>
        String(index + 1)
      );
      seatsArray.pop();
      seatsArray.reverse();
      return seatsArray;
    }
  };

  const chooseVehicle = (car: string) => {
    userData.vehicles.map((vehicle: Vehicle) => {
      if (vehicle.brand + " " + vehicle.model === car) {
        setVehicle({
          label: vehicle.brand + " " + vehicle.model,
          seats: getSeatNumber(vehicle.seats),
        });
        setRouteDetails({
          ...routeDetails,
          vehicle: vehicle,
          availableSeats: String(parseInt(vehicle.seats) - 1),
        });
        setButtonText({
          ...buttonText,
          car: vehicle.brand + " " + vehicle.model,
        });
      }
    });
  };

  const addHourToDate = (d: Date) => {
    const dateAux = new Date(
      auxDate.getFullYear(),
      auxDate.getMonth(),
      auxDate.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    );
    setRouteDetails({ ...routeDetails, date: dateAux });
  };

  const publishRide = () => {
    console.log(validateLocation(routeDetails.from));
    console.log(validateLocation(routeDetails.to));

    if (dateValidator(routeDetails.date)) {
      if (
        validateLocation(routeDetails.from) &&
        validateLocation(routeDetails.to)
      ) {
        setRoute(routeDetails);
        setButtonText({
          car: "Choose vehicle",
          seats: "Choose seat number",
        });
        onDismiss();
      } else {
        setSnackBarMessage("From and To fields cannot be empty!");
        setSnackBarVisible(true);
      }
    } else {
      console.log("DATE HAS TO BE SET TO FUTURE");
      setSnackBarMessage("Data has to be set to the future!");
      setSnackBarVisible(true);
    }
  };

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={{
            backgroundColor: "white",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            alignSelf: "center",
          }}
          visible={giveVisible}
          onDismiss={() => {
            onDismiss();
          }}
        >
          <Dialog.Content>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{ height: Dimensions.get("window").height - 100 }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    //@ts-ignore
                    marginBottom: -25,
                    position: "absolute",
                  }}
                  onPress={() => {
                    onDismiss();
                  }}
                >
                  <Ionicons name="arrow-back" size={45} color="#fd4d4d" />
                </TouchableOpacity>
                <Image
                  style={styles.profilePic}
                  source={require("../../assets/images/ride.png")}
                />
              </View>
              <View style={{ height: 250 }}>
                <View>
                  <Text style={styles.title}>
                    <Entypo name="location-pin" size={25} color="#fd4d4d" />
                    Route
                  </Text>
                  <View
                    style={{
                      width: 400,
                      alignSelf: "center",
                      zIndex: 1,
                      position: "absolute",
                    }}
                  >
                    <SearchBar
                      location={routeDetails.from}
                      placeholder="From"
                      visible={true}
                    ></SearchBar>
                  </View>
                  <View
                    style={{
                      width: 400,
                      alignSelf: "center",
                      position: "absolute",
                      marginTop: 70,
                    }}
                  >
                    <SearchBar
                      location={routeDetails.to}
                      placeholder="To"
                      visible={true}
                    ></SearchBar>
                  </View>
                </View>
              </View>
              <Divider
                style={{ backgroundColor: "#151a21", zIndex: -1 }}
              ></Divider>
              <View style={{ zIndex: -1 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                    alignSelf: "center",
                    marginTop: 25,
                  }}
                >
                  <AntDesign name="calendar" size={24} color="#fd4d4d" />
                  Date
                </Text>

                <View style={styles.datePickerContainer}>
                  {Platform.OS === "ios" && (
                    <DatePicker
                      display="default"
                      value={routeDetails.date}
                      mode="date"
                      style={styles.datePicker}
                      // @ts-ignore
                      onChange={onChange}
                    />
                  )}

                  {Platform.OS === "android" && (
                    <TouchableOpacity
                      style={styles.textInput}
                      onPress={() => setShow(!show)}
                    >
                      <Text style={{ alignSelf: "center" }}>{titleDate}</Text>
                    </TouchableOpacity>
                  )}
                  {show && (
                    <DatePicker
                      display="default"
                      style={styles.datePickerStyle}
                      value={new Date()}
                      mode="time"
                      // @ts-ignore
                      onChange={(e, d) => {
                        setShow(false);
                        if (d !== undefined) {
                          addHourToDate(d);
                          setTitleTime(d.toLocaleTimeString());
                        }
                      }}
                    />
                  )}

                  {Platform.OS === "ios" && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={routeDetails.date}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      // @ts-ignore
                      onChange={onChange}
                      style={styles.datePicker}
                    />
                  )}

                  {show && (
                    <DatePicker
                      display="default"
                      style={styles.datePickerStyle}
                      value={new Date()}
                      mode="date"
                      // @ts-ignore
                      onChange={(e, d) => {
                        setShow(false);
                        if (d !== undefined) {
                          // setRouteDetails({ ...routeDetails, date: d });
                          auxDate = d;
                          setTitleD(d.toLocaleDateString());
                        }
                      }}
                    />
                  )}
                </View>
              </View>
              <Divider style={{ backgroundColor: "#151a21", zIndex: -1 }} />
              <View style={{ zIndex: -1 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                    alignSelf: "center",
                    marginTop: 25,
                    marginBottom: 20,
                  }}
                >
                  <AntDesign name="car" size={24} color="#fd4d4d" />
                  Vehicle
                </Text>
                {Platform.OS === "ios" ? (
                  <>
                    <Button
                      text={buttonText.car}
                      full={false}
                      press={() => {
                        chooseCarRef.current?.setModalVisible();
                      }}
                    />
                    <ActionSheet ref={chooseCarRef}>
                      <View>
                        <Picker
                          style={{
                            justifyContent: "center",
                            width: "100%",
                            height: 250,
                          }}
                          itemStyle={{ height: "100%" }}
                          selectedValue={vehicle.label}
                          onValueChange={(itemValue) =>
                            chooseVehicle(itemValue)
                          }
                        >
                          {userData.vehicles.map((vehicle: Vehicle) => {
                            return (
                              <Picker.Item
                                key={vehicle.licensePlate}
                                label={vehicle.brand + " " + vehicle.model}
                                value={vehicle.brand + " " + vehicle.model}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </ActionSheet>
                  </>
                ) : (
                  <Picker
                    style={{
                      width: 250,
                      height: 44,
                      alignSelf: "center",
                      marginBottom: 30,
                    }}
                    itemStyle={{ height: 50 }}
                    selectedValue={vehicle.label}
                    onValueChange={(itemValue) => chooseVehicle(itemValue)}
                  >
                    {userData.vehicles.map((vehicle: Vehicle) => {
                      return (
                        <Picker.Item
                          key={vehicle.licensePlate}
                          label={vehicle.brand + " " + vehicle.model}
                          value={vehicle.brand + " " + vehicle.model}
                        />
                      );
                    })}
                  </Picker>
                )}
              </View>
              <Divider style={{ backgroundColor: "#151a21", zIndex: -1 }} />
              <View style={{ zIndex: -1 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                    alignSelf: "center",
                    marginTop: 25,
                    marginBottom: 20,
                  }}
                >
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />
                  Avaiable Seats
                </Text>
                {Platform.OS === "ios" ? (
                  <>
                    <Button
                      text={buttonText.seats}
                      full={false}
                      press={() => {
                        chooseSeatNumberRef.current?.setModalVisible();
                      }}
                    />
                    <ActionSheet ref={chooseSeatNumberRef}>
                      <View>
                        <Picker
                          style={{
                            justifyContent: "center",
                            width: "100%",
                            height: 250,
                          }}
                          itemStyle={{ height: "100%" }}
                          selectedValue={routeDetails.availableSeats}
                          onValueChange={(itemValue) => {
                            setRouteDetails({
                              ...routeDetails,
                              availableSeats: itemValue,
                            });
                            setButtonText({ ...buttonText, seats: itemValue });
                          }}
                        >
                          {vehicle.seats?.map((seatNumber) => {
                            return (
                              <Picker.Item
                                key={seatNumber}
                                label={String(seatNumber)}
                                value={String(seatNumber)}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </ActionSheet>
                  </>
                ) : (
                  <Picker
                    style={{
                      width: 250,
                      height: 44,
                      alignSelf: "center",
                      marginBottom: 30,
                    }}
                    itemStyle={{ height: 50 }}
                    selectedValue={routeDetails.availableSeats}
                    onValueChange={(itemValue) =>
                      setRouteDetails({
                        ...routeDetails,
                        availableSeats: itemValue,
                      })
                    }
                  >
                    {vehicle.seats?.map((seatNumber) => {
                      return (
                        <Picker.Item
                          key={seatNumber}
                          label={String(seatNumber)}
                          value={String(seatNumber)}
                        />
                      );
                    })}
                  </Picker>
                )}
              </View>
            </ScrollView>
            <View>
              <Button press={publishRide} full={true} text={"Continue"} />
            </View>
          </Dialog.Content>
        </Dialog>
        <Snackbar
          duration={2500}
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
            {snackBarMessage}
          </Text>
        </Snackbar>
      </Portal>
    </Provider>
  );
};
export default GiveRidePopUp;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 10,
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  datePicker: {
    alignSelf: "center",
    width: 120,
    marginTop: 30,
    marginBottom: 30,
  },
  profilePic: {
    height: 185,
    width: 185,
    alignSelf: "center",
    marginBottom: -35,
  },
  textInput: {
    //flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
    marginBottom: 30,
  },
  datePickerStyle: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
    alignItems: "center",
  },
});
