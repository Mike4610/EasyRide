import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.headerContainer}> */}
      <MenuButton navigation={navigation} />
      <MapView
        initialRegion={{
          latitude: 41.45159,
          longitude: -8.29353,
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
      <FabButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  buttons: {
    marginTop: 30,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
