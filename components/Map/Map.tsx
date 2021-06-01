import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  LegacyRef,
} from "react";

import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import Loading from "../Loading/Loading";
import Marker from "./Marker";
import { RouteContext } from "../../context/RouteContext";
import { Place, Route, Vehicle } from "../../types";
import MapViewDirections from "react-native-maps-directions";
import RouteDetailsPopUp from "../PopUp/RouteDetailsPopUp";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../../googleConfig";

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

  const map: LegacyRef<MapView> = useRef(null);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);

  useEffect(() => {
    (async () => {
      await getInitialLocation();
    })();
  }, []);

  useEffect(() => {
    setRouteDetails(route);
    console.log("ROOOUTE", route);
  }, [route]);

  useEffect(() => {
    console.log("RouteDetails", routeDetails);
    traceRoute();
  }, [routeDetails]);

  const traceRoute = () => {
    if (routeDetails?.from && routeDetails.to)
      map.current?.fitToCoordinates(
        [
          {
            latitude: routeDetails.from?.latitude,
            longitude: routeDetails.from?.longitude,
          },
          {
            latitude: routeDetails.to?.latitude,
            longitude: routeDetails.to?.longitude,
          },
        ],
        {
          edgePadding: {
            top: 60,
            bottom: 60,
            left: 60,
            right: 60,
          },
          animated: false,
        }
      );
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
          {routeDetails && (
            <>
              <MapViewDirections
                origin={routeDetails.from}
                destination={routeDetails.to}
                apikey={GOOGLE_API_KEY}
                strokeWidth={4}
                strokeColor="#fd4d4d"
                onReady={(result) => {
                  console.log("AAAA", routeDetails);

                  setRouteDetails({
                    ...routeDetails,
                    duration: result.duration.toFixed(2),
                    distance: result.distance.toFixed(2),
                  });
                }}
                onError={(error) => {
                  console.log(error);
                }}
              />
              {Object.keys(routeDetails).map((key, index) => {
                if (routeDetails) {
                  return (
                    <Marker
                      key={index}
                      type={index + 1}
                      visible={true}
                      location={routeDetails[key]}
                    />
                  );
                }
              })}
            </>
          )}
        </MapView>
        {routeDetails && <RouteDetailsPopUp details={routeDetails} />}
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
