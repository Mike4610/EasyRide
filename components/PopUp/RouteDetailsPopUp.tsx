import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AntDesign, Feather, Zocial } from "@expo/vector-icons";
import { RouteDetails } from "../../types";
import Button from "../Buttons/Button";

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
      <View style={{ height: 165, padding: 20 }}>
        <Text style={{ fontSize: 16, alignSelf: "center" }}>
          From: {details.from}{" "}
        </Text>
        <Text style={{ fontSize: 16, alignSelf: "center" }}>
          To: {details.to}{" "}
        </Text>
        <Text style={{ fontSize: 16, alignSelf: "center" }}>
          Date: {details.date}{" "}
        </Text>
        <Text style={{ fontSize: 16, alignSelf: "center" }}>
          Distance: {details.distance} Km{" "}
        </Text>
        <Text style={{ fontSize: 16, alignSelf: "center" }}>
          Duration: {details.duration} min
        </Text>
      </View>
      <View>
        <Button text={"Confirm"} full={true} press={() => {}}></Button>
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
