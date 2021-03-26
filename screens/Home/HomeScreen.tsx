import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Dialog, Portal, Provider } from "react-native-paper";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import { RequestRideContext } from "../../context/RequestRideContext";
import MapView from "react-native-maps";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  //POPUP
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //@ts-ignore
      setLocation(location);
    })();
  }, []);

  if (location === null) {
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
  } else {
    return (
      //@ts-ignore
      <RequestRideContext.Provider value={{ visible, setVisible }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Type a location"
              placeholderTextColor="#151a21"
              style={styles.input}
            ></TextInput>
          </View>
          {/* <MapView
          initialRegion={{
            //@ts-ignore
            latitude: location.coords.latitude,
            //@ts-ignore
            longitude: location.coords.longitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.045,
          }}
          showsCompass={true}
          rotateEnabled={false}
          // showsTraffic={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.map}
        ></MapView> */}
          <MenuButton navigation={navigation} />
          <FabButton
            onGive={() => {
              setVisible(true);
            }}
            onRequest={() => {
              setVisible(true);
            }}
          />
          <RequestRidePopUp />
        </SafeAreaView>
      </RequestRideContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  input: {
    padding: 12,
    color: "black",
    borderRadius: 30,
    backgroundColor: "white",
    height: 45,
    marginTop: 75,
  },
  searchBar: {
    flex: 1,
    zIndex: 0,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
