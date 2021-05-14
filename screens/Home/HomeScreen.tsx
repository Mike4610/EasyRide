import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { SearchContext } from "../../context/SearchContext";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import GiveRidePopUp from "../../components/PopUp/GiveRidePopUp";
import Map from "../../components/Map/Map";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import LocationButtons from "../../components/Buttons/LocationButtons";
import firebase from "firebase/app";

import "firebase/auth";
import { ScreenNavigationProps } from "../../types";

const HomeScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  //POPUP
  const [requestVisible, setRequestVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [giveVisible, setGiveVisible] = useState(false);
  const [transform, setTransform] = useState({
    fabVisible: true,
    returnButton: false,
    searchBar: false,
    locationButtons: false,
  });

  const requestRideHandler = () => {
    setTransform({
      fabVisible: false,
      returnButton: true,
      searchBar: true,
      locationButtons: true,
    });
  };

  const onDismiss = () => {
    setTransform({
      fabVisible: true,
      returnButton: false,
      searchBar: false,
      locationButtons: false,
    });
  };

  return (
    <SearchContext.Provider value={{ searchLocation, setSearchLocation }}>
      <SafeAreaView style={styles.container}>
        <Map locationVisible={transform.locationButtons} />
        <SearchBar
          visible={transform.searchBar}
          setAddressLocation={() => {}}
        />
        <MenuButton
          onDismiss={onDismiss}
          returnButton={transform.returnButton}
          navigation={navigation}
        />

        <FabButton
          visible={transform.fabVisible}
          onGive={() => {
            setGiveVisible(true);
          }}
          onRequest={() => {
            requestRideHandler();
          }}
        />
        {/* <RequestRidePopUp
        requestVisible={requestVisible}
        onDismiss={() => {
          setRequestVisible(false);
        }}
      /> */}
        <GiveRidePopUp
          giveVisible={giveVisible}
          onDismiss={() => {
            setGiveVisible(false);
          }}
        />
        {/*  <LocationButtons visible={transform.locationButtons} /> */}
      </SafeAreaView>
    </SearchContext.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
