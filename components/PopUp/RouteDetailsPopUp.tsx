import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AntDesign, Feather, Zocial } from "@expo/vector-icons";
import { RouteDetails } from "../../types";
<<<<<<< Updated upstream
import Button from "../Buttons/Button";
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      }}
    >
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", alignSelf: "center" }}>
          Details
        </Text>
      </View>
<<<<<<< Updated upstream
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
=======
      <View>
        <Text>From: {details.from} </Text>
        <Text>To: {details.to} </Text>
        <Text>Date: {details.date} </Text>
        <Text>Distance: {details.distance} </Text>
        <Text>Duration: {details.duration}</Text>
>>>>>>> Stashed changes
      </View>
    </View>
  );
};
export default RouteDetailsPopUp;
