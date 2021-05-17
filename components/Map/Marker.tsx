import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import { LatLng, MarkerAnimated } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";

interface Props {
  location: LatLng;
  visible: boolean;
  type: number;
}

const Marker: React.FC<Props> = ({ location, visible, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log(type);
  }, []);

  return (
    <View>
      {type === 1 ? (
        <MarkerAnimated coordinate={location} anchor={{ x: 0.35, y: 0.32 }}>
          <FontAwesome name="car" size={24} color="#151a21" />
        </MarkerAnimated>
      ) : type === 2 ? (
        <MarkerAnimated coordinate={location} anchor={{ x: 0.35, y: 0.32 }}>
          <Entypo name="location-pin" size={30} color="#151a21" />
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
