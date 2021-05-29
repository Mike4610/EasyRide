import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  LegacyRef,
} from "react";
<<<<<<< Updated upstream
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
=======
import { StyleSheet, Dimensions, View, Text } from "react-native";
import MapView, { Camera } from "react-native-maps";
>>>>>>> Stashed changes
import * as Location from "expo-location";
import Loading from "../Loading/Loading";
import Marker from "./Marker";
import { RouteContext } from "../../context/RouteContext";
import { Place, RouteDetails } from "../../types";
import MapViewDirections from "react-native-maps-directions";
<<<<<<< Updated upstream
import RouteDetailsPopUp from "../PopUp/RouteDetailsPopUp";
import { GOOGLE_API_KEY } from "../../googleConfig";
=======
import Button from "../../components/Buttons/Button";
import RouteDetailsPopUp from "../PopUp/RouteDetailsPopUp";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  const [region, setRegion] = useState(null);
>>>>>>> Stashed changes
  const map: LegacyRef<MapView> = useRef(null);
  const [routeDetails, setRouteDetails] = useState<RouteDetails>({
    from: "",
    to: "",
    date: "",
    distance: 0,
    duration: 0,
  });
<<<<<<< Updated upstream

=======
  //@ts-ignore
>>>>>>> Stashed changes
  useEffect(() => {
    (async () => {
      await getInitialLocation();
    })();
  }, []);

<<<<<<< Updated upstream
=======
  // useEffect(() => {
  //   setRegion({
  //     //@ts-ignore
  //     latitude: location.latitude,
  //     //@ts-ignore
  //     longitude: location.longitude,
  //     longitudeDelta: 0.045,
  //     latitudeDelta: 0.045,
  //   });
  // }, [location]);

>>>>>>> Stashed changes
  useEffect(() => {
    console.log("ROOOUTE", route);
    if (route) {
      map.current?.fitToCoordinates([route.from, route.to], {
        edgePadding: {
          top: 60,
          bottom: 60,
          left: 60,
          right: 60,
        },
        animated: false,
      });
    }
  }, [route]);

  useEffect(() => {
    console.log(routeDetails);
  }, [routeDetails]);

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

  if (location.latitude === 0 && location.longitude === 0) {
    return <Loading />;
  } else {
    return (
      <View>
        <MapView
          ref={map}
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
          style={route ? styles.halfScreenMap : styles.fullScreenMap}
        >
          {route && (
            <>
              <MapViewDirections
                origin={route.from}
                destination={route.to}
                apikey={GOOGLE_API_KEY}
                strokeWidth={4}
                strokeColor="#fd4d4d"
                onReady={(result) => {
                  setRouteDetails({
                    duration: result.duration.toFixed(2),
                    distance: result.distance.toFixed(2),
                    from: route.from.description,
                    to: route.to.description,
                    date: "",
                  });
                }}
                onError={(error) => {
                  console.log(error);
                }}
              />
              {Object.keys(route).map((key, index) => {
                if (route) {
                  return (
                    <Marker
                      key={index}
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
        {route && <RouteDetailsPopUp details={routeDetails} />}
<<<<<<< Updated upstream
=======
        {/* <LocationButton
          loading={loading}
          setCurrentLocation={setCurrentLocation}
        /> */}
>>>>>>> Stashed changes
      </View>
    );
  }
};

export default Map;

const styles = StyleSheet.create({
  fullScreenMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -40,
  },
  halfScreenMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.55,
    zIndex: -40,
  },
});
