import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import GiveRidePopUp from "../../components/PopUp/GiveRidePopUp";
import { RequestRideContext, GiveRideContext } from "../../context/PopUpContext";
import Map from "../../components/Map/Map";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function HomeScreen({ navigation }: { navigation: any }) {
  //POPUP
  const [requestVisible, setRequestVisible] = useState(false);
  const [giveVisible, setGiveVisible] = useState(false);

  return (
    //@ts-ignore
    <RequestRideContext.Provider value={{ requestVisible, setRequestVisible }}>
      {/* @ts-ignore */}
      <GiveRideContext.Provider value={{ giveVisible, setGiveVisible }}>
        <SafeAreaView style={styles.container}>
          <SearchBar />
          {/* <Map /> */}
          <MenuButton navigation={navigation} />
          <FabButton
            onGive={() => {
              setGiveVisible(true);
            }}
            onRequest={() => {
              setRequestVisible(true);
            }}
          />
          <RequestRidePopUp />
          <GiveRidePopUp />
        </SafeAreaView>
      </GiveRideContext.Provider>
    </RequestRideContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
