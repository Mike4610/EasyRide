import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

import { Route, RouteDetails, Place, User } from "../../types";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import firebase from "firebase";
import "firebase/firestore";
import AvailableRideCard from "../../components/Cards/AvailableRideCard";
import { RequestRouteContext } from "../../context/RequestRouteContext";

const geofire = require("geofire-common");

interface Props {
  requestRide: Route;
  setRoute: (route: Route) => void;
  setView: (value: any) => void;
}

const RouteDetailsPopUp: React.FC<Props> = ({
  requestRide,
  setRoute,
  setView,
}) => {
  const [availableRoutesFrom, setAvailableRoutesFrom] = useState<Route[]>([]);
  const [availableRoutesTo, setAvailableRoutesTo] = useState<Route[]>([]);
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [userData, setUserData] = useState<User>({} as User);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [getUser] = useAsyncStorage();
  const { requestRoute, setRequestRoute } = useContext(RequestRouteContext);

  let userID = ""

  useEffect(() => {
    (async () => {
      const user = await getUser();
      userID = user.id;
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    fetchDestinationRides();
  }, [availableRoutesFrom]);

  useEffect(() => {
    let ridesAux = [] as Route[];
    let exists = false;

    availableRoutesFrom.forEach((rideFrom) => {
      availableRoutesTo.forEach((rideTo) => {
        exists = false;
        if (
          rideFrom.id === rideTo.id &&
          rideFrom.driverId != userData.id &&
          Number(rideFrom.availableSeats) > 0
        ) {

          ridesAux.forEach(rideAux => {
            if(rideFrom.id === rideAux.id){
              exists = true;
            }
          });
          if(exists == false){
            ridesAux.push(rideFrom);
          }
          
        }
      });
    });

    setAvailableRoutes(ridesAux);
  }, [availableRoutesTo]);

  useEffect(() => {
    if (!availableRoutes.length) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [availableRoutes]);

  const chooseRoute = async (route: Route) => {
    setRoute(route);
  };

  const fetchDestinationRides = async () => {
    const center = [requestRide.to.latitude, requestRide.to.longitude];
    const radius = 5000;

    const bounds = geofire.geohashQueryBounds(center, radius);
    const promises = [];
    for (const b of bounds) {
      const q = firebase
        .firestore()
        .collection("rides")
        .orderBy("to.geoHash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }

    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("to.latitude");
            const lng = doc.get("to.longitude");

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radius) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        let ridesAux = [] as Route[];
        const now = new Date();
        matchingDocs.forEach((doc) => {
          let date = new Date(doc.data().date.seconds * 1000);
          if (date.getTime() - now.getTime() > 0) {
            // @ts-ignore
            ridesAux.push(doc.data());
          }
          // @ts-ignore
          //ridesAux.push(doc.data());
        });

        setAvailableRoutesTo(ridesAux);
      });
  };

  const fetchAvailableRides = async () => {
    const center = [requestRide.from.latitude, requestRide.from.longitude];
    const radius = requestRide.range || 0;

    const bounds = geofire.geohashQueryBounds(center, radius * 1000);
    const promises = [];
    for (const b of bounds) {
      const q = firebase
        .firestore()
        .collection("rides")
        .orderBy("from.geoHash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }

    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("from.latitude");
            const lng = doc.get("from.longitude");

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radius * 1000) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        let ridesAux = [] as Route[];
        let now = new Date();
        let add = true;

        matchingDocs.forEach((doc) => {
          let date = new Date(doc.data().date.seconds * 1000);
          if (date.getTime() - now.getTime() > 0) {
            add = true;
            doc.data().passengersId.forEach((passID: string) => {
              if(passID === userID){
                add=false;
              }
            });
            if(add === true){ 
              // @ts-ignore
              ridesAux.push(doc.data());
            }
            
          }
        });

        setAvailableRoutesFrom(ridesAux);
      });
  };

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.5,
        backgroundColor: "white",
        padding: 20,
        zIndex: 1,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            alignSelf: "center",
            paddingBottom: 15,
          }}
        >
          Available Rides
        </Text>
      </View>

      <ScrollView style={{ height: 280 }}>
        {noResults ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Image
              style={{ width: 200, height: 150 }}
              source={require("../../assets/images/noresults.png")}
            />
            <Text style={{ fontSize: 18, padding: 20 }}>
              {" "}
              No results found...{" "}
            </Text>
          </View>
        ) : !availableRoutes.length ? (
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            size="large"
            color="#fd4d4d"
            animating={true}
          />
        ) : (
          <></>
        )}
        {availableRoutes.map((route, index) => {
          return (
            <AvailableRideCard
              // @ts-ignore
              key={route.id}
              route={route}
              chooseRoute={setRoute}
              // @ts-ignore
              setView ={setView}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default RouteDetailsPopUp;
