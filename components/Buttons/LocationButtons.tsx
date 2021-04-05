import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FAB } from "react-native-paper";

interface Props {
  visible: boolean;
}
const LocationButtons: React.FC<Props> = ({ visible }) => {

  return (
    <View
      style={visible ? styles.visibleContainer : styles.invisibleContainer}
    >
      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          color="white"
          icon="briefcase-outline"
          onPress={() => {}}
        />
        <Text style={styles.text}>Work</Text>
      </View>

      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          color="white"
          icon="home-outline"
          onPress={() => {}}
        />
        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          color="white"
          icon="compass-outline"
          onPress={() => {}}
        />
        <Text style={styles.text}>Current Location</Text>
      </View>
    </View>
  );
};

export default LocationButtons;

const styles = StyleSheet.create({
  visibleContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 30,
  },
  invisibleContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    display: "none",
  },
  fabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },
  fab: {
    margin: 16,
    right: 0,
    backgroundColor: "#fd4d4d",
    zIndex: 30,
  },
  text: { fontSize: 14, color: "#151a21" },
});
