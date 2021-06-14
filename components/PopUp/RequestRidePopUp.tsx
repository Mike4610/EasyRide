import { Dialog, Portal, Provider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import SearchBar from "../SearchBar/SearchBar";
import { Divider } from "react-native-paper";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import DatePicker, {
  AndroidEvent,
} from "@react-native-community/datetimepicker";
import Button from "../Buttons/Button";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { Place, User, Vehicle } from "../../types";
import { Route } from "../../types";
import { RouteContext } from "../../context/RouteContext";
import Slider from "@react-native-community/slider";
interface Props {
  requestVisible: boolean;
  onDismiss: () => void;
}

const RequestRidePopUp: React.FC<Props> = ({ requestVisible, onDismiss }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      setRouteDetails({
        ...routeDetails,
        date: selectedDate,
      });

      console.log(selectedDate);
    }
  };

  const [titleDate, setTitleDate] = useState("Select Time and Date");
  const [titleD, setTitleD] = useState("");
  const rangeNumbers = ["5 km", "10 km", "25 km", "50 km", "100 km", "500 km"];
  const [range, setRange] = useState("5");

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
    from: {} as Place,
    to: {} as Place,
    date: new Date(),
    duration: 0,
    distance: 0,
    vehicle: {} as Vehicle,
    availableSeats: "",
  };

  const [routeDetails, setRouteDetails] = useState<Route>(initialState);

  const { route, setRoute } = useContext(RouteContext);

  useEffect(() => {
    setRouteDetails({
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

    console.log("give ride route mudou");
  }, [route]);

  useEffect(() => {
    setRouteDetails({
      ...routeDetails,
      driverId: userData.id,
      passengersId: [] as string[],
      vehicle: userData.vehicles[0],
      availableSeats: String(parseInt(userData.vehicles[0]?.seats) - 1),
    });
  }, [userData]);

  useEffect(() => {
    (async () => {
      const user = await getValue();

      setUserData(user);
    })();
  }, []);

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

  useEffect(() => {
    if (titleD == "") {
      setTitleDate("Select Date");
    } else {
      setTitleDate("Date : " + titleD);
    }
  }, [titleD]);
  return (
    <Provider>
      <Portal>
        <Dialog
          style={{
            backgroundColor: "white",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            alignSelf: "center",
          }}
          visible={requestVisible}
          onDismiss={() => {
            onDismiss();
          }}
        >
          <Dialog.Content>
            <View>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{ height: Dimensions.get("window").height - 100 }}
              >
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
                        // zIndex: 1,
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
                <Text
                  style={{
                    zIndex: -1,
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
                      mode="date"
                      onChange={(e, d) => {
                        setShow(false);
                        if (d !== undefined) {
                          setRouteDetails({ ...routeDetails, date: d });
                          setTitleD(d.toLocaleDateString());
                        }
                      }}
                    />
                  )}
                </View>

                <Divider
                  style={{ backgroundColor: "#151a21", zIndex: -1 }}
                ></Divider>

                <Text
                  style={{
                    zIndex: -1,
                    fontWeight: "bold",
                    fontSize: 22,
                    alignSelf: "center",
                    marginTop: 25,
                  }}
                >
                  <Entypo name="compass" size={24} color="#fd4d4d" />
                  Range
                </Text>

                <Text
                  style={{
                    zIndex: -1,
                    fontSize: 18,
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  {range} Km
                </Text>

                <Slider
                  style={{
                    width: 250,
                    height: 40,
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                  value={5}
                  minimumValue={1}
                  maximumValue={20}
                  minimumTrackTintColor="#fd4d4d"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onValueChange={(itemValue) => setRange(itemValue)}
                />

                {/* <Picker
                  style={{ width: 250, height: 44, alignSelf: "center" }}
                  itemStyle={{ height: 44 }}
                  selectedValue={range}
                  onValueChange={(itemValue) => setRange(itemValue)}
                >
                  {rangeNumbers.map((number) => {
                    return (
                      <Picker.Item key={number} label={number} value={number} />
                    );
                  })}
                </Picker> */}
              </ScrollView>
              <View>
                <Button
                  press={() => {
                    console.log(routeDetails);
                    setRoute(routeDetails);
                    onDismiss();
                  }}
                  full={true}
                  text={"Request Ride"}
                />
              </View>
            </View>
          </Dialog.Content>
        </Dialog>
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
  popup_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 10,
  },
  datePickerContainer: {
    zIndex: -1,
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
