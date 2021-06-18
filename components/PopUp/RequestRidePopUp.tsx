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
import DateTimePicker from "@react-native-community/datetimepicker";
import { RequestRouteContext } from "../../context/RequestRouteContext";
import { or } from "react-native-reanimated";
import { RouteContext } from "../../context/RouteContext";
import Slider from "@react-native-community/slider";
import { dateValidator } from "../../utils";
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
      setRide({
        ...ride,
        date: selectedDate,
      });

      console.log(selectedDate);
    }
  };

  const [titleDate, setTitleDate] = useState("Select Time and Date");
  const [titleD, setTitleD] = useState("");

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

  const initialRide: Route = {
    from: {} as Place,
    to: {} as Place,
    date: new Date(),
    duration: 0,
    distance: 0,
    range: 5,
  };

  const [getValue] = useAsyncStorage();

  const [ride, setRide] = useState(initialRide);

  const { requestRoute, setRequestRoute } = useContext(RequestRouteContext);

  // useEffect(() => {
  //   console.log(ride);
  // }, [ride]);

  useEffect(() => {
    (async () => {
      const user = await getValue();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    if (titleD == "") {
      setTitleDate("Select Date");
    } else {
      setTitleDate("Date : " + titleD);
    }
  }, [titleD]);

  function confirmRideRequest() {
    if (
      ride.from &&
      ride.to &&
      ride.range &&
      ride.range > 0 &&
      ride.range < 21
    ) {
      if (dateValidator(ride.date))
        // console.log("é hoje ou depois")
        setRequestRoute(ride);
    }
  }

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
                  source={require("../../assets/images/requestride.png")}
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
                        location={ride.from}
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
                        location={ride.to}
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
                      value={ride.date}
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
                          setRide({ ...ride, date: d });
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
                  {ride.range} Km
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
                  onValueChange={(itemValue) =>
                    setRide({ ...ride, range: itemValue })
                  }
                />
              </ScrollView>
              <View>
                <Button
                  press={() => {
                    console.log(ride);
                    confirmRideRequest();
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
