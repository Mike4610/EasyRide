import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, Image } from "react-native";

import { Route, RouteDetails, Place, User } from "../../types";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import "firebase/firestore";
import AvailableRideCard from "../../components/Cards/AvailableRideCard";

const geofire = require("geofire-common");

interface Props {
  requestRide: Route;
  setRoute: (route: Route) => void;
}

const RouteDetailsPopUp: React.FC<Props> = ({ requestRide, setRoute }) => {
  const [availableRoutesFrom, setAvailableRoutesFrom] = useState<Route[]>([]);
  const [availableRoutesTo, setAvailableRoutesTo] = useState<Route[]>([]);
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [userData, setUserData] = useState<User>({} as User);
  const [getUser] = useAsyncStorage();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    fetchDestinationRides();
  }, [availableRoutesFrom]);

  useEffect(() => {
    let ridesAux = [] as Route[];
    availableRoutesFrom.forEach((rideFrom) => {
      availableRoutesTo.forEach((rideTo) => {
        if (
          rideFrom.driverId === rideTo.driverId &&
          rideFrom.from.latitude === rideTo.from.latitude &&
          rideFrom.from.longitude === rideTo.from.longitude &&
          rideFrom.to.latitude === rideTo.to.latitude &&
          rideFrom.to.longitude === rideTo.to.longitude
        ) {
          ridesAux.push(rideFrom);
        }
      });
    });

    setAvailableRoutes(ridesAux);
  }, [availableRoutesTo]);

  const chooseRoute = async (route: Route) => {
    console.log("route escolhida", route);
    setRoute(route);
  };

  const fetchDestinationRides = async () => {
    const center = [requestRide.to.latitude, requestRide.to.longitude];
    const radius = 1000;

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

        matchingDocs.forEach((doc) => {
          // @ts-ignore
          if (doc.data().driverId !== userData.id) ridesAux.push(doc.data());
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

        matchingDocs.forEach((doc) => {
          let date = new Date(doc.data().date.seconds * 1000);
          if (
            date.getTime() - now.getTime() > 0 &&
            doc.data().driverId !== userData.id
          ) {
            // @ts-ignore
            ridesAux.push(doc.data());
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
        {!availableRoutes.length && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20
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
        )}
        {availableRoutes.map((route, index) => {
          return (
            <AvailableRideCard
              key={route.from.geoHash + route.driverId + route.date}
              route={route}
              chooseRoute={chooseRoute}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default RouteDetailsPopUp;
