import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Ionicons, AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import "firebase/firestore";
import { Route } from "../../types";
import Button from "../Buttons/Button";

interface Props {
  route: Route;
  chooseRoute: (route: Route) => void;
  setView?: (value: any) => void;
  moreInfo?: (route: Route) => void;
}

const AvailableRideCard: React.FC<Props> = ({
  route,
  chooseRoute,
  setView,
  moreInfo,
}) => {
  const [formattedDate, setFormattedDate] = useState<Date>(
    // @ts-ignore
    new Date(route.date.seconds * 1000)
  );
  useEffect(() => {
    console.log(JSON.stringify(route));
  }, []);
  return (
    <View
      key={route.id}
      style={styles.infoContainer}
    >
      <View style={styles.info}>
        <Text style={styles.textDescription}>
          <FontAwesome name="car" size={20} color="#fd4d4d" />{" "}
          <Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
          {route.from.description}
        </Text>
      </View>
      <View style={styles.info}>
        <Entypo name="location-pin" size={22} color="#fd4d4d" />
        <Text style={styles.textDescription}>
          {" "}
          <Text style={{ fontWeight: "bold" }}>To:</Text> {route.to.description}
        </Text>
      </View>
      <View style={styles.info}>
        <AntDesign name="calendar" size={20} color="#fd4d4d" />
        <Text style={styles.textDescription}>
          <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
          {formattedDate.toLocaleDateString() +
            " " +
            formattedDate.getHours() +
            ":" +
            formattedDate.getMinutes() +
            "h"}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.textDescription}>
          <Ionicons name="person-outline" size={20} color="#fd4d4d" />
          <Text style={{ fontWeight: "bold" }}>Available seats:</Text>{" "}
          {route.availableSeats}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          width: "100%",
        }}
      >
        <Button
          text={"View more"}
          press={() => {
            if (chooseRoute) chooseRoute(route);
            if (moreInfo) moreInfo(route);
            if (setView) setView("join");
          }}
          full={true}
        />
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomColor: "#151a21",
    padding: 30,
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
    width: 300,
    alignSelf: "center",
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
