import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Image } from "react-native";
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

interface Props {
  details: Route;
  confirmRide: () => void;
  cancelRide: (ride: Route) => void;
  type: string;
}

const RouteDetailsPopUp: React.FC<Props> = ({
  details,
  confirmRide,
  cancelRide,
  type,
}) => {
  const [formattedDate, setFormattedDate] = useState<Date>(
    new Date(details.date.seconds)
  );

  const [driver, setDriver] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      if (type === "join") {
        const usersSnapshot = await firebase
          .firestore()
          .collection("users")
          .where("id", "==", details.driverId)
          .get();
        usersSnapshot.docs.forEach((doc) => {
          setDriver(doc.data());
        });
      }
    })();
  }, []);

  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.5,
        backgroundColor: "white",
        padding: 20,
        zIndex: 1,
      }}
    >
      <ScrollView
        style={{
          height: 200,
          padding: 10,
          alignSelf: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              alignSelf: "center",
              padding: 15,
            }}
          >
            Ride Details
          </Text>
        </View>
        <View
          style={{ padding: 30, borderRadius: 30, backgroundColor: "#f9f9f9" }}
        >
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
            <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
            {details.from?.description}{" "}
          </Text>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <Entypo name="location-pin" size={20} color="#fd4d4d" />
            <Text style={{ fontWeight: "bold" }}>To:</Text>{" "}
            {details.to?.description}{" "}
          </Text>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
            <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
            {/* {type === "view" ? (
            formattedDate.toLocaleDateString() +
            " " +
            formattedDate.getHours() +
            ":" +
            formattedDate.getMinutes() +
            "h"
          ) : type === "create" ? (
            details.date.toLocaleDateString() + " " + details.date.getHours() + ":" + details.date.getMinutes()
          ) : (
            <></>
          )} */}
          </Text>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={16}
              color="#fd4d4d"
            />{" "}
            <Text style={{ fontWeight: "bold" }}>Distance:</Text>{" "}
            {details.distance} Km{" "}
          </Text>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
            <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
            {details.duration} min
          </Text>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <MaterialCommunityIcons name="car-info" size={20} color="#fd4d4d" />{" "}
            <Text style={{ fontWeight: "bold" }}>Vehicle:</Text>{" "}
            {details.vehicle?.brand + " " + details.vehicle?.model}
          </Text>
          {type === "join" && (
            <Text style={{ fontSize: 14, textAlign: "left" }}>
              <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
              <Text style={{ fontWeight: "bold" }}>License Plate:</Text>{" "}
              {details?.vehicle?.licensePlate}
            </Text>
          )}
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
            <Text style={{ fontWeight: "bold" }}>Available Seats:</Text>{" "}
            {details?.availableSeats}
          </Text>
        </View>

        {type === "join" && (
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                alignSelf: "center",
                padding: 15,
              }}
            >
              Driver Info
            </Text>
            <View
              style={{
                padding: 30,
                borderRadius: 30,
                backgroundColor: "#f9f9f9",
              }}
            >
              {driver.profileImgURL && (
                <Image
                  style={{
                    borderRadius: 60,
                    height: 60,
                    width: 60,
                    alignSelf: "center",
                    margin: 5,
                  }}
                  source={{ uri: driver.profileImgURL }}
                />
              )}

              <Text style={{ fontSize: 14, textAlign: "left" }}>
                <AntDesign name="user" size={20} color="#fd4d4d" />{" "}
                <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                {driver.fullName}{" "}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "left" }}>
                <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
                <Text style={{ fontWeight: "bold" }}>Birth Date:</Text>{" "}
                {driver.birthDate}{" "}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "left" }}>
                <AntDesign name="phone" size={20} color="#fd4d4d" />{" "}
                <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>
                {driver.phoneNumber}
                {/* {type === "view" ? (
            formattedDate.toLocaleDateString() +
            " " +
            formattedDate.getHours() +
            ":" +
            formattedDate.getMinutes() +
            "h"
          ) : type === "create" ? (
            details.date.toLocaleDateString() + " " + details.date.getHours() + ":" + details.date.getMinutes()
          ) : (
            <></>
          )} */}
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
        ) : (
          <>
            <Button
              text={"Join ride"}
              full={true}
              press={() => {
                cancelRide(details);
              }}
            ></Button>
          </>
        )}
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
