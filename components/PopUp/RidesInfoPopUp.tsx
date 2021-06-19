import React, { useState, useEffect } from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Route, User } from "../../types";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import firebase from "firebase/app";
import "firebase/firestore";

interface Props {
  route: Route;
  visible: boolean;
  onDismiss: () => void;
}

const RidesInfoPopUp: React.FC<Props> = ({ visible, route, onDismiss }) => {
  const [userData, setUserData] = useState({} as User);
  const [passengers] = useState<User[]>([] as User[]);
  const [getUser] = useAsyncStorage();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    if (userData) {
      if (route.driverId === userData.id) {
        route.passengersId?.forEach(async (id) => {
          try {
            const response = await firebase
              .firestore()
              .collection("users")
              .doc(id)
              .get();
            passengers.push(response.data());
          } catch (error) {
            console.error(error);
          }
        });
      }
    }
  }, [userData]);

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog onDismiss={onDismiss} visible={visible}>
          <View style={styles.container}>
            <ScrollView style={styles.view}>
              <View>
                <Text style={styles.title}>Ride Details</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>
                  <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
                  <Text style={styles.boldText}>From:</Text>{" "}
                  {route.from?.description}{" "}
                </Text>
                <Text style={styles.text}>
                  <Entypo name="location-pin" size={20} color="#fd4d4d" />
                  <Text style={styles.boldText}>To:</Text>{" "}
                  {route.to?.description}{" "}
                </Text>
                <Text style={styles.text}>
                  <AntDesign name="calendar" size={20} color="#fd4d4d" />
                  <Text style={styles.boldText}>Date:</Text>{" "}
                </Text>
                <Text style={styles.text}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={16}
                    color="#fd4d4d"
                  />{" "}
                  <Text style={styles.boldText}>Distance:</Text>{" "}
                  {route.distance} Km{" "}
                </Text>
                <Text style={styles.text}>
                  <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
                  <Text style={styles.boldText}>Duration:</Text>{" "}
                  {route.duration} min
                </Text>
                <Text style={styles.text}>
                  <MaterialCommunityIcons
                    name="car-info"
                    size={20}
                    color="#fd4d4d"
                  />{" "}
                  <Text style={styles.boldText}>Vehicle:</Text>{" "}
                  {route.vehicle?.brand + " " + route.vehicle?.model}
                </Text>

                <Text style={styles.text}>
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
                  <Text style={styles.boldText}>Available Seats:</Text>{" "}
                  {route?.availableSeats}
                </Text>
              </View>
              {route.driverId === userData.id ? (
                <View>
                  <Text style={styles.title}>Passengers Info</Text>
                  {route.passengersId?.map((passenger) => {})}
                </View>
              ) : (
                <></>
              )}
            </ScrollView>
          </View>
        </Dialog>
      </Portal>
    </Provider>
  );
};
export default RidesInfoPopUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 500,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 14, textAlign: "left" },
  boldText: { fontWeight: "bold" },
  profileImg: {
    borderRadius: 60,
    height: 60,
    width: 60,
    alignSelf: "center",
    margin: 5,
  },
  card: {
    padding: 30,
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
    width: 300,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 15,
  },
  view: {
    padding: 10,
    alignSelf: "center",
  },
});
