import React from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";
export default function Loading() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/RMLogo.png")}
        ></Image>
      </View>
      <ActivityIndicator size="large" color="#fd4d4d" />
    </View>
  );
}

const styles = StyleSheet.create({
    loadingScreen: {
      flex: 1,
      backgroundColor: "#151a21",
      justifyContent: "center",
      alignItems: "center",
    },
    logoContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 355,
      height: 100,
    },
  });