import React, { useContext, useState } from "react";
import { StyleSheet, View, Appearance } from "react-native";
import { LatLng, MarkerAnimated } from "react-native-maps";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { Route } from "../../types";
import JoinRidePopUp from "../PopUp/JoinRidePopUp";
import { DetailsContext } from "../../context/DetailsContext";

interface Props {
  location: LatLng;
  type: string;
  ride?: Route;
  onPress?: () => void;
}

const Marker: React.FC<Props> = ({ location, type, ride, onPress }) => {
  const [details, setDetails] = useState(ride);

  const setSelectedRide = () => {
    if (ride) setDetails(ride);
  };

  return (
    <View>
      {type === "from" ? (
        <>
          <MarkerAnimated
            onPress={() => {
              if (onPress) onPress();
            }}
            coordinate={location}
            anchor={{ x: 0.35, y: 0.32 }}
          >
            <Ionicons name="car" size={30} color="#fd4d4d" />
          </MarkerAnimated>
        </>
      ) : type === "to" ? (
        <MarkerAnimated
          onPress={() => { if (onPress) onPress(); }}
          coordinate={location}
          anchor={{ x: 0.35, y: 0.32 }}
        >
          <Entypo name="location-pin" size={30} color="#fd4d4d" />
        </MarkerAnimated>
      ) : (
        <></>
      )}
    </View>
  );
};
export default Marker;

const styles = StyleSheet.create({
  visibleMarker: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  invisibleMarker: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    display: "none",
  },
});
