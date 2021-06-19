import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  LegacyRef,
} from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import Loading from "../Loading/Loading";
import Marker from "./Marker";
import { RouteContext } from "../../context/RouteContext";
import { RequestRouteContext } from "../../context/RequestRouteContext";
import { Place, Route, User, Vehicle } from "../../types";
import MapViewDirections from "react-native-maps-directions";
import RouteDetailsPopUp from "../PopUp/RouteDetailsPopUp";
import ListRidesPopUp from "../PopUp/ListRidesPopUp";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../../googleConfig";
import LoadingPopUp from "../PopUp/LoadingPopUp";
import { sleep } from "../../utils";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import * as TaskManager from "expo-task-manager";
import { CurrentRidesContext } from "../../context/CurrentRidesContext";

interface Props {
  setReturn: () => void;
}

const Map: React.FC<Props> = ({ setReturn }) => {
  const [location, setLocation] = useState<Place>({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const { route, setRoute } = useContext(RouteContext);
  const { viewRides, setViewRides } = useContext(CurrentRidesContext);
  const { requestRoute, setRequestRoute } = useContext(RequestRouteContext);
  const [loadingState, setLoadingState] = useState({
    loading: false,
    correct: false,
    error: false,
  });
  const map: LegacyRef<MapView> = useRef(null);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const [toListRoute, setToListRoute] = useState<Route | null>(null);
  const [currentRides, setCurrentRides] = useState<Route[] | null>(null);
  const [userData, setUserData] = useState<User>({} as User);
  const [getUser] = useAsyncStorage();
  const [detailsType, setDetailsType] = useState<string>("create");
  const [loadingMessage, setLoadingMessage] = useState(
    "Publishing your ride..."
  );

  useEffect(() => {
    (async () => {
      await getInitialLocation();
      const user = await getUser();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    setRouteDetails(route);
  }, [route]);

  useEffect(() => {}, [toListRoute]);

  useEffect(() => {
    setToListRoute(requestRoute);
  }, [requestRoute]);

  useEffect(() => {
    (async () => {
      await fetchUserRides(userData.id);
    })();
  }, [userData]);

  useEffect(() => {
    if (!routeDetails) {
      setDetailsType("create");
      setLoadingMessage("Publishing your ride...");
      setViewRides(false);
    }

    if (
      routeDetails?.from.latitude !== undefined &&
      routeDetails?.to.latitude !== undefined
    ) {
      fitToCoordinates([
        {
          latitude: routeDetails?.from?.latitude,
          longitude: routeDetails?.from?.longitude,
        },
        {
          latitude: routeDetails?.to?.latitude,
          longitude: routeDetails?.to?.longitude,
        },
      ]);
    }
  }, [routeDetails]);

  // useEffect(() => {
  //   if (currentRides?.length) showUserRides();
  // }, [currentRides]);

  useEffect(() => {
    console.log("view", viewRides);
    (async () => {
      if (viewRides) {
        showUserRides();
      } else {
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
    })();
  }, [viewRides]);

  const fetchUserRides = async (id?: string) => {
    if (id !== undefined) {
      let ridesAux = [] as Route[];
      const ridesSnapshot = await firebase
        .firestore()
        .collection("rides")
        .where("driverId", "==", id)
        .get();
      ridesSnapshot.docs.forEach((doc) => {
        ridesAux.push(doc.data());
      });

      setCurrentRides(ridesAux);
    }
  };

  const joinRide = async (ride: Route) => {
    ride.passengersId?.push(userData.id);
    let newSeatNumber = parseInt(ride.availableSeats) - 1;
    ride.availableSeats = String(newSeatNumber);
    try {
      await firebase.firestore().collection("rides").doc(ride.id).update(ride);
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleType = () => {
    if (detailsType === "view") {
      setDetailsType("create");
      setLoadingMessage("Publishing your ride...");
    } else {
      setDetailsType("view");
      setLoadingMessage("Deleting your ride...");
    }
  };

  const confirmRide = async () => {
    let routeAux = {} as Route | null;
    routeAux = routeDetails;
    setRoute(null);
    setVisible(true);
    setLoadingState({ ...loadingState, loading: true });
    try {
      firebase
        .firestore()
        .collection("rides")
        .add(routeAux)
        .then(async ({ id }) => {
          await firebase
            .firestore()
            .collection("rides")
            .doc(id)
            .update({ ...routeAux, ...{ id } });
        });
    } catch (error) {
      console.error(error);
    }

    setLoadingState({ ...loadingState, loading: false, correct: true });
    await sleep(2000);

    await fetchUserRides(userData.id);
    setVisible(false);
  };

  const cancelRide = async (ride: Route) => {
    setRoute(null);
    setVisible(true);
    setLoadingState({ ...loadingState, loading: true });
    try {
      await firebase.firestore().collection("rides").doc(ride.id).delete();
    } catch (error) {
      console.error(error);
    }

    setLoadingState({ ...loadingState, loading: false, correct: true });
    await sleep(2000);

    await fetchUserRides(userData.id);
    setVisible(false);
  };

  const endListing = async () => {
    setToListRoute(null);
  };

  const fitToCoordinates = (coordinateArray: LatLng[]) => {
    map.current?.fitToCoordinates(coordinateArray, {
      edgePadding: {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60,
      },
      animated: false,
    });
  };

  const showUserRides = () => {
    let ridesArray = [
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    ];

    if (currentRides) {
      currentRides.forEach(({ from: { latitude, longitude } }: Route) =>
        ridesArray.push({
          latitude: latitude,
          longitude: longitude,
        })
      );
      fitToCoordinates(ridesArray);
    }
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

  if (location.latitude === 0 && location.longitude === 0 && !currentRides) {
    return <Loading />;
  } else {
    return (
      <View>
        <MapView
          onPress={() => {
            console.log("PRESS");
          }}
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
          showsUserLocation={true}
          showsMyLocationButton={false}
          // followsUserLocation={true}
          style={
            routeDetails || toListRoute
              ? styles.halfScreenMap
              : styles.fullScreenMap
          }
        >
          {currentRides?.map((ride, index) => {
            if (viewRides)
              return (
                <Marker
                  key={index}
                  ride={ride}
                  onPress={() => {
                    toggleType();
                    setRoute(ride);
                  }}
                  type={"from"}
                  location={{
                    latitude: ride.from?.latitude,
                    longitude: ride.from?.longitude,
                  }}
                />
              );
          })}

          {routeDetails && (
            <>
              <MapViewDirections
                origin={routeDetails.from}
                destination={routeDetails.to}
                apikey={GOOGLE_API_KEY}
                strokeWidth={4}
                strokeColor="#8d99ae"
                onReady={(result) => {
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
                if (routeDetails && (key === "from" || key === "to")) {
                  return (
                    <Marker
                      key={index}
                      type={key}
                      location={routeDetails[key]}
                    />
                  );
                }
              })}
            </>
          )}
        </MapView>
        {routeDetails && (
          <RouteDetailsPopUp
            type={detailsType}
            confirmRide={confirmRide}
            cancelRide={cancelRide}
            joinRide={joinRide}
            details={routeDetails}
          />
        )}

        {toListRoute && (
          <ListRidesPopUp
            setRoute={(route: Route) => {
              setRoute(route);
              setDetailsType("join");
            }}
            requestRide={toListRoute}
          />
        )}
        <LoadingPopUp
          {...loadingState}
          visible={visible}
          message={loadingMessage}
        />
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
    height: Dimensions.get("window").height * 0.5,
    zIndex: -40,
  },
});
