import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Loading from "../Loading/Loading";

export default function Map() {
  const [location, setLocation] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      await getInitialLocation();
      // await getGeocodeAddress()
      await Location.watchPositionAsync({ distanceInterval: 1 }, async () => {
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      });
    })();
  }, []);

  // const getGeocodeAddress = async () => {
  //     let a = await Location.geocodeAsync("central park zoo east 64th street")
  //     console.log(a)
  //     let latitude = await a[0].latitude
  //     let longitude = await a[0].longitude
  //     setLocation({latitude, longitude})
  // }
  const getInitialLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  };

  if (location === null) {
    return <Loading />;
  } else {
    return (
      <MapView
        region={{
          //@ts-ignore
          latitude: location.latitude,
          //@ts-ignore
          longitude: location.longitude,
          longitudeDelta: 0.045,
          latitudeDelta: 0.045,
        }}
        showsCompass={true}
        rotateEnabled={false}
        // showsTraffic={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
      ></MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
});
