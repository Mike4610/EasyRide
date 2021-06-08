import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";
import { Route, RouteDetails } from "../../types";
import Button from "../Buttons/Button";
import firebase from "firebase/app";
import "firebase/firestore";

interface Props {
  details: Route;
  confirmRide: () => void;
}

const RouteDetailsPopUp: React.FC<Props> = ({ details, confirmRide }) => {
  useEffect(() => {
    console.log(details);
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
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", alignSelf: "center" }}>
          Ride Details
        </Text>
      </View>

      <View
        style={{
          height: 200,
          padding: 10,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
          {details.from?.description}{" "}
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <Entypo name="location-pin" size={20} color="#fd4d4d" />
          <Text style={{ fontWeight: "bold" }}>To:</Text>{" "}
          {details.to?.description}{" "}
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
          {details.date.toLocaleDateString() +
            " " +
            details.date.getHours() +
            ":" +
            details.date.getMinutes() +
            "h"}
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={16}
            color="#fd4d4d"
          />{" "}
          <Text style={{ fontWeight: "bold" }}>Distance:</Text>{" "}
          {details.distance} Km{" "}
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
          {details.duration} min
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <MaterialCommunityIcons name="car-info" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Vehicle:</Text>{" "}
          {details.vehicle?.brand + " " + details.vehicle?.model}
        </Text>
        <Text style={{ fontSize: 17, textAlign: "left" }}>
          <Ionicons name="person-outline" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Available Seats:</Text>{" "}
          {details?.availableSeats}
        </Text>
      </View>
      <View>
        <Button text={"Confirm"} full={true} press={confirmRide}></Button>
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
