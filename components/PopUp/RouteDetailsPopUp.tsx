import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AntDesign, Feather, Zocial } from "@expo/vector-icons";
import { RouteDetails } from "../../types";

interface Props {
  details: RouteDetails;
}

const RouteDetailsPopUp: React.FC<Props> = ({ details }) => {
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
          Details
        </Text>
      </View>
      <View>
        <Text>From: {details.from} </Text>
        <Text>To: {details.to} </Text>
        <Text>Date: {details.date} </Text>
        <Text>Distance: {details.distance} </Text>
        <Text>Duration: {details.duration}</Text>
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
