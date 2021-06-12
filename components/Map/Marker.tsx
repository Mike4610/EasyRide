import React, { useState, useEffect } from "react";
import { StyleSheet, View, Appearance } from "react-native";
import { LatLng, MarkerAnimated } from "react-native-maps";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { Route } from "../../types";
import JoinRidePopUp from "../PopUp/JoinRidePopUp";

interface Props {
  location: LatLng;
  type: number;
  ride?: Route;
}

const Marker: React.FC<Props> = ({ location, type, ride }) => {
  // const [mode, setMode] = useState<string>("#151a21");

  // useEffect(() => {
  //   Appearance.getColorScheme() === "dark"
  //     ? setMode("#a3a3a3")
  //     : setMode("#151a21");
  // }, []);

  return (
    <View>
      {type === 1 ? (
        <>
          <MarkerAnimated
            onPress={() => {
              setSelectedRide();
            }}
            coordinate={location}
            anchor={{ x: 0.35, y: 0.32 }}
          >
            <Ionicons name="car" size={30} color="#151a21" />
          </MarkerAnimated>
        </>
      ) : type === 2 ? (
        <MarkerAnimated
          onPress={() => {
            console.log("PRESSSSS");
          }}
          coordinate={location}
          anchor={{ x: 0.35, y: 0.32 }}
        >
          <Entypo name="location-pin" size={30} color="151a21" />
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
