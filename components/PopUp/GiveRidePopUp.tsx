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
import { Dialog, Portal, Provider } from "react-native-paper";
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
import { getDistance, getPreciseDistance } from "geolib";
interface Props {
  giveVisible: boolean;
  onDismiss: () => void;
}

const GiveRidePopUp: React.FC<Props> = ({ giveVisible, onDismiss }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const [userData, setUserData] = useState<User>({
    id: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    createdAt: "",
    vehicles: [],
  });
  const [getValue] = useAsyncStorage();
  const [vehicle, setVehicle] = useState<Vehicle>({
    brand: "",
    model: "",
    licensePlate: "",
    seats: "",
  });
  const from: Place = {
    latitude: 0,
    longitude: 0,
  };
  const to: Place = {
    latitude: 0,
    longitude: 0,
  };
  const [route] = useState<Route>({
    from,
    to,
  });
  const { setRoute } = useContext(RouteContext);

  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      const user = await getValue();
      setUserData(user);
    })();
  }, []);

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
                      zIndex: 1,
                      position: "absolute",
                    }}
                  >
                    <SearchBar
                      from={route.from}
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
                      to={route.to}
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
                  <DatePicker
                    display="default"
                    value={date}
                    mode="date"
                    style={styles.datePicker}
                    onChange={(e, d) => {
                      if (d !== undefined) {
                        setDate(d);
                      }
                    }}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    style={styles.datePicker}
                  />
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
                <Picker
                  style={{
                    width: 250,
                    height: 44,
                    alignSelf: "center",
                    marginBottom: 30,
                  }}
                  itemStyle={{ height: 50 }}
                  selectedValue={vehicle}
                  onValueChange={(itemValue) => setVehicle(itemValue)}
                >
                  {userData.vehicles.map(({ brand, model, licensePlate }) => {
                    return (
                      <Picker.Item
                        key={licensePlate}
                        label={brand + " " + model}
                        value={brand + " " + model}
                      />
                    );
                  })}
                </Picker>
              </View>
            </ScrollView>
            <View>
              <Button
                press={() => {
                  console.log(route);
                  console.log(vehicle);
                  console.log(getDistance(route.from, route.to))
                  setRoute(route);
                  onDismiss();
                }}
                full={true}
                text={"Continue"}
              />
            </View>
          </Dialog.Content>
        </Dialog>
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
});
