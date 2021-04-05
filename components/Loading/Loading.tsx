import React from "react";
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const Loading: React.FC<{}> = () => {
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
};

export default Loading;

const styles = StyleSheet.create({
  loadingScreen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#151a21",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
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
