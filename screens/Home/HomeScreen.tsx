import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import GiveRidePopUp from "../../components/PopUp/GiveRidePopUp";
import Map from "../../components/Map/Map";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";

export default function HomeScreen({ navigation }: { navigation: any }) {
  //POPUP
  const [requestVisible, setRequestVisible] = useState(false);
  const [giveVisible, setGiveVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Map/> */}
      <MenuButton navigation={navigation} />

      <FabButton
        onGive={() => {
          setGiveVisible(true);
        }}
        onRequest={() => {
          setRequestVisible(true);
        }}
      />
      <RequestRidePopUp
        requestVisible={requestVisible}
        onDismiss={() => {
          setRequestVisible(false);
        }}
      />
      <GiveRidePopUp
        giveVisible={giveVisible}
        onDismiss={() => {
          setGiveVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
