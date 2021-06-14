import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  Portal,
  Provider,
  Divider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { DetailsContext } from "../../context/DetailsContext";
import { Route } from "../../types";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Button from "../Buttons/Button";
import firebase from "firebase/app";
import "firebase/firestore";

interface Props {
  visible: boolean;
  route: Route;
}

const LoadingPopUp: React.FC<Props> = ({ visible, route }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const { details, setDetails } = useContext(DetailsContext);
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await firebase
          .firestore()
          .collection("users")
          .doc(route.driverId)
          .get();
        console.log(response.data());
        setDriverInfo({
          fullName: response.data()?.fullName,
          birthDate: response.data()?.birthDate,
          phoneNumber: response?.data()?.phoneNumber,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={styles.container}
          visible={isVisible}
          onDismiss={() => {
            setIsVisible(false);
            setDetails(null);
          }}
        >
          {!driverInfo ? (
            <View>
              <ActivityIndicator color="#fd4d4d"></ActivityIndicator>
            </View>
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Ride Details</Text>
              </View>
              <View>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
                  {route.from?.description}{" "}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Entypo name="location-pin" size={20} color="#fd4d4d" />
                  <Text style={{ fontWeight: "bold" }}>To:</Text>{" "}
                  {route.to?.description}{" "}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
                  {/* {route.date.toLocaleDateString() +
                " " +
                route.date.getHours() +
                ":" +
                route.date.getMinutes() +
                "h"} */}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={16}
                    color="#fd4d4d"
                  />{" "}
                  <Text style={{ fontWeight: "bold" }}>Distance:</Text>{" "}
                  {route.distance} Km{" "}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
                  {route.duration} min
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <MaterialCommunityIcons
                    name="car-info"
                    size={20}
                    color="#fd4d4d"
                  />{" "}
                  <Text style={{ fontWeight: "bold" }}>Vehicle:</Text>{" "}
                  {route.vehicle?.brand + " " + route.vehicle?.model}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Available Seats:</Text>{" "}
                  {route?.availableSeats}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Driver:</Text>{" "}
                  {driverInfo?.fullName}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Driver:</Text>{" "}
                  {driverInfo?.birthDate}
                </Text>
                <Text style={{ fontSize: 17, textAlign: "left" }}>
                  <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
                  <Text style={{ fontWeight: "bold" }}>Driver:</Text>{" "}
                  {driverInfo?.phoneNumber}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>Driver's Info</Text>
              </View>
              <View style={{ width: "100%", padding: 20, bottom: -70 }}>
                <Button text={"Join"} full={true} press={() => {}} />
                {/* <Button text={"Cancel ride"} full={false} press={() => {}} /> */}
              </View>
            </>
          )}
        </Dialog>
      </Portal>
    </Provider>
  );
};
export default LoadingPopUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 420,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 50,
  },
});
