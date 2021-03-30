import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export default function LocationButton({
  loading,
  setCurrentLocation,
}: {
  loading: boolean;
  setCurrentLocation: () => void;
}) {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  
  if (!isLoading) {
    return (
      <FAB
        style={styles.fab}
        color="#fd4d4d"
        icon="compass-outline"
        onPress={() => {
          setCurrentLocation();
        }}
      />
    );
  } else {
    return (
      <FAB
        style={styles.fab}
        color="#fd4d4d"
        loading
        icon="compass-outline"
        onPress={() => {}}
      />
    );
  }
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: "white"
  },
});
