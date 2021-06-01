import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";
import { Route, RouteDetails } from "../../types";
import Button from "../Buttons/Button";
import firebase from "firebase/app";
import "firebase/firestore";

interface Props {
  details: Route;
}

const RouteDetailsPopUp: React.FC<Props> = ({ details }) => {

  const publishRideHandler = async () => {
    try {
      await firebase.firestore().collection("rides").add(details);
    } catch (error) {
      console.error(error);
    }
    details = null
  };

  return (
    <View
      style={{
        height: Dimensions.get("window").height / 2,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", alignSelf: "center" }}>
          Ride Details
        </Text>
      </View>

      <View style={{ height: 165, padding: 15, alignSelf: "center" }}>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
          {details.from?.description}{" "}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <Entypo name="location-pin" size={20} color="#fd4d4d" />
          <Text style={{ fontWeight: "bold" }}>To:</Text>{" "}
          {details.to?.description}{" "}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <AntDesign name="calendar" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
          {details.date.toLocaleDateString() +
            " " +
            details.date.getHours() +
            ":" +
            details.date.getMinutes()}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={16}
            color="#fd4d4d"
          />{" "}
          <Text style={{ fontWeight: "bold" }}>Distance:</Text>{" "}
          {details.distance} Km{" "}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <Entypo name="stopwatch" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Duration:</Text> :{" "}
          {details.duration} min
        </Text>
        <Text style={{ fontSize: 16, textAlign: "left" }}>
          <MaterialCommunityIcons name="car-info" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>Vehicle:</Text> :{" "}
          {details.vehicle?.brand + " " + details.vehicle?.model}
        </Text>
      </View>
      <View>
        <Button
          text={"Confirm"}
          full={true}
          press={publishRideHandler}
        ></Button>
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
