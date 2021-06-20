import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";
import { Route, RouteDetails, User } from "../../types";
import Button from "../Buttons/Button";
import firebase from "firebase/app";
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

interface Props {
  details: Route;
  confirmRide: () => void;
  cancelRide: (ride: Route) => void;
  joinRide: (ride: Route) => void;
  leaveRide: (ride: Route) => void;
  type: string;
}

const RouteDetailsPopUp: React.FC<Props> = ({
  details,
  confirmRide,
  cancelRide,
  joinRide,
  leaveRide,
  type,
}) => {
  const [formattedDate, setFormattedDate] = useState<Date>(
    // @ts-ignore
    new Date(details.date.seconds * 1000)
  );

  const [driver, setDriver] = useState<User>({} as User);


  useEffect(() => {
    (async () => {
      if (type === "join" || type == "leave") {
        const usersSnapshot = await firebase
          .firestore()
          .collection("users")
          .where("id", "==", details.driverId)
          .get();
        usersSnapshot.docs.forEach((doc) => {
          // @ts-ignore
          setDriver(doc.data());
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.view}>
        <View>
          <Text style={styles.title}>Ride Details</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>
            <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
            <Text style={styles.boldText}>From:</Text>{" "}
            {details.from?.description}{" "}
          </Text>
          <Text style={styles.text}>
            <Entypo name="location-pin" size={20} color="#fd4d4d" />{" "}
            <Text style={styles.boldText}>To:</Text>
            {details.to?.description}{" "}
          </Text>
          <Text style={styles.text}>
            <AntDesign name="calendar" size={20} color="#fd4d4d" />
            <Text style={styles.boldText}>Date:</Text>{" "}
            {type === "view" || type === "join" ? (
              <Text>{formattedDate.toLocaleString()}</Text>
            ) : type === "create" ? (
              <Text>{details.date.toLocaleString()}</Text>
            ) : (
              <></>
            )}
          </Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={16}
              color="#fd4d4d"
            />{" "}
            <Text style={styles.boldText}>Distance:</Text> {details.distance} Km{" "}
          </Text>
          <Text style={styles.text}>
            <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
            <Text style={styles.boldText}>Duration:</Text> {details.duration}{" "}
            min
          </Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons name="car-info" size={20} color="#fd4d4d" />{" "}
            <Text style={styles.boldText}>Vehicle:</Text>{" "}
            {details.vehicle?.brand + " " + details.vehicle?.model}
          </Text>
          {type === "join" && (
            <Text style={styles.text}>
              <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
              <Text style={styles.boldText}>License Plate:</Text>{" "}
              {details?.vehicle?.licensePlate}
            </Text>
          )}
          <Text style={styles.text}>
            <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
            <Text style={styles.boldText}>Available Seats:</Text>{" "}
            {details?.availableSeats}
          </Text>
        </View>

        {(type === "join" || type === "leave") && (
          <View>
            <Text style={styles.title}>Driver Info</Text>
            <View style={styles.card}>
              {driver.profileImgURL === "" ? (
                <Avatar.Text
                  label={"?"}
                  style={styles.profileImg}
                />
              ) : (
                <Image
                  style={styles.profileImg}
                  source={{ uri: driver.profileImgURL }}
                />
              )}

              <Text style={styles.text}>
                <AntDesign name="user" size={20} color="#fd4d4d" />{" "}
                <Text style={styles.boldText}>Name:</Text> {driver.fullName}{" "}
              </Text>
              <Text style={styles.text}>
                <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
                <Text style={styles.boldText}>Birth Date:</Text>{" "}
                {driver.birthDate}{" "}
              </Text>
              <Text style={styles.text}>
                <AntDesign name="phone" size={20} color="#fd4d4d" />{" "}
                <Text style={styles.boldText}>Phone Number:</Text>{" "}
                {driver.phoneNumber}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View>
        {type === "create" ? (
          <Button text={"Confirm"} full={true} press={confirmRide}></Button>
        ) : type === "view" ? (
          <Button
            text={"Cancel ride"}
            full={true}
            press={() => {
              cancelRide(details);
            }}
          ></Button>
        ) : type === "join" ? (
          <>
            <Button
              text={"Join ride"}
              full={true}
              press={() => {
                joinRide(details);
              }}
            ></Button>
          </>
        ) : (
          <>
            <Button
              text={"Leave ride"}
              full={true}
              press={() => {
                joinRide(details);
              }}
            ></Button>
          </>
        )}
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;

const styles = StyleSheet.create({
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
  container: {
    height: Dimensions.get("window").height * 0.5,
    backgroundColor: "white",
    padding: 20,
    zIndex: 1,
  },
});
