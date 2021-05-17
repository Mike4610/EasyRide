import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Loading from "../Loading/Loading";
import Marker from "./Marker";
import LocationButton from "../Buttons/LocationButton";
import { RouteContext } from "../../context/RouteContext";
import { Place } from "../../types";
import MapViewDirections from "react-native-maps-directions";
interface Props {
  locationVisible: boolean;
}
const Map: React.FC<Props> = ({ locationVisible }) => {
  const [location, setLocation] = useState<Place>({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { route } = useContext(RouteContext);
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);
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
    console.log("aaroute", route);
  }, []);

  // useEffect(() => {
  //   console.log(route);
  // }, [route]);

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

  if (location.latitude === undefined || location.longitude === undefined) {
    return <Loading />;
  } else {
    return (
      <View>
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
          {route && (
            <>
              <MapViewDirections
                origin={route.from}
                destination={route.to}
                apikey={"AIzaSyCk08TOprTNr1B9tIrztczcoqEcgtCJpVM"} // insert your API Key here
                strokeWidth={4}
                strokeColor="#fd4d4d"
              />
              {Object.keys(route).map((key, index) => {
                if (route) {
                  return (
                    <Marker
                      key={route[key][index]}
                      type={index + 1}
                      visible={true}
                      location={route[key]}
                    />
                  );
                }
              })}
            </>
          )}
        </MapView>
        <LocationButton
          loading={loading}
          setCurrentLocation={setCurrentLocation}
        />
      </View>
    );
  }
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -40,
  },
});
