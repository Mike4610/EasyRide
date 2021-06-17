import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import "firebase/firestore";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Route } from "../../types";

interface Props {
  route: Route;
  chooseRoute: (route: Route) => void;
}
const AvailableRideCard: React.FC<Props> = ({ route, chooseRoute }) => {
  useEffect(() => {
    console.log(JSON.stringify(route));
  }, []);
  return (
    <View
      key={route.from.geoHash + route.driverId + route.date}
      style={styles.infoContainer}
    >
      <View
        style={{
          marginTop: 20,
        }}
      ></View>

      <View style={styles.info}>
        <AntDesign name="idcard" size={28} color="#fd4d4d" />
        <Text style={styles.textDescription}>
          From: {route.from.description}
        </Text>
      </View>
      <View style={styles.info}>
        <AntDesign name="idcard" size={28} color="#fd4d4d" />
        <Text style={styles.textDescription}>To: {route.to.description}</Text>
      </View>
      <View style={styles.info}>
        <AntDesign name="idcard" size={28} color="#fd4d4d" />
        <Text style={styles.textDescription}>
          Date:{" "}
            {route.date.toLocaleDateString +
            " " +
            route.date.getHours +
            ":" +
            route.date.getMinutes +
            "h"}
        </Text>
      </View>
    </View>
  );
};

export default AvailableRideCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  textDescription: {
    fontSize: 14,
    color: "#151a21",
    // fontWeight: "bold",
    marginLeft: 5,
  },
  footer: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  footer_text: {
    fontSize: 18,
    color: "#151a21",
    marginLeft: 5,
  },
  footer_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    zIndex: -1,
  },
  profileName: {
    color: "#a3a3a3",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  profilePic: {
    height: 150,
    width: 290,
    marginTop: 20,
  },
  memberSince: {
    color: "#fd4d4d",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#151a21",
    borderBottomWidth: 0.5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttons: {
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  rightAction: {
    backgroundColor: "#fd4d4d",
    /* borderTopRightRadius: 30, */
    flex: 1,
    alignSelf: "center",
  },
  actionIcon: {
    color: "#fff",
    alignSelf: "center",
    flex: 1,
    padding: 20,
  },
});
