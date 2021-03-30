import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { LatLng, MarkerAnimated } from "react-native-maps";

const Driver = ({
  location,
  visible,
}: {
  location: LatLng;
  visible: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <MarkerAnimated coordinate={location} anchor={{ x: 0.35, y: 0.32 }}>
      <Image
        style={isVisible ? styles.visibleMarker : styles.invisibleMarker}
        source={require("../../assets/images/marker.png")}
      />
    </MarkerAnimated>
  );
};

export default Driver;

const styles = StyleSheet.create({
  visibleMarker: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  invisibleMarker: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    display: "none",
  },
});
