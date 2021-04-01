import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import Marker from "./Marker";
import LocationButtons from "../Buttons/LocationButtons";

export default function Map() {
  const [location, setLocation] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  //@ts-ignore
  useEffect(() => {
    (async () => {
      await getInitialLocation();
      // await getGeocodeAddress()
      // await Location.watchPositionAsync({ distanceInterval: 1 }, async () => {
      //   let { coords } = await Location.getCurrentPositionAsync({});
      //   setLocation(coords);
      // });
    })();
  }, []);

  const setAddressLocation = async (address: string) => {
    if (address !== "") {
      let addressLocation = await Location.geocodeAsync(address);
      let { latitude, longitude } = await addressLocation[0];
      setLocation({ latitude, longitude });
      setVisible(true);
    }
  };

  const setCurrentLocation = async () => {
    setLoading(true);
    let { coords } = await Location.getCurrentPositionAsync({});
    setVisible(false);
    setLocation(coords);
    setLoading(false);
  };

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
      <View>
        <LocationButtons visible={true}/>
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
        >
          <Marker
            visible={visible}
            location={{
              //  @ts-ignore
              longitude: location.longitude,
              //  @ts-ignore
              latitude: location.latitude,
            }}
          />
        </MapView>
        
        
        {/* <LocationButton
          loading={loading}
          setCurrentLocation={setCurrentLocation}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -40,
  },
});
