import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { RouteContext } from "../../context/RouteContext";
import { RequestRouteContext } from "../../context/RequestRouteContext";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import GiveRidePopUp from "../../components/PopUp/GiveRidePopUp";
import Map from "../../components/Map/Map";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";

import "firebase/auth";
import { Route, ScreenNavigationProps } from "../../types";

const HomeScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  //POPUP
  const [requestVisible, setRequestVisible] = useState(false);
  const [giveVisible, setGiveVisible] = useState(false);
  const [transform, setTransform] = useState({
    fabVisible: true,
    returnButton: false,
    searchBar: false,
    locationButtons: false,
  });

  const [route, setRoute] = useState<Route | null>(null);
  const [requestRoute, setRequestRoute] = useState<Route | null>(null);
  const [visible, setVisible] = useState(true);

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

  useEffect(() => {
    if (route?.from?.latitude !== 0 && route?.to?.longitude! == 0) {
      setVisible(false);
    }
  }, [route]);

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      <RequestRouteContext.Provider value={{ requestRoute, setRequestRoute }}>
        <SafeAreaView style={styles.container}>
          <Map locationVisible={transform.locationButtons} />

          <MenuButton
            onDismiss={onDismiss}
            returnButton={transform.returnButton}
            navigation={navigation}
          />

          <FabButton
            visible={visible}
            onGive={() => {
              setGiveVisible(true);
            }}
            onRequest={() => {
              setRequestVisible(true);
              // requestRideHandler();
            }}
          />
          <GiveRidePopUp
            giveVisible={giveVisible}
            onDismiss={() => {
              setGiveVisible(false);
            }}
          />
          <RequestRidePopUp
            requestVisible={requestVisible}
            onDismiss={() => {
              setRequestVisible(false);
            }}
          />
        </SafeAreaView>
      </RequestRouteContext.Provider>
    </RouteContext.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  bottomButtons: {
    flex: 1,
    zIndex: 10,
  },
});
