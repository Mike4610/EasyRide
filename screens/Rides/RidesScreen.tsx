import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import MenuButton from "../../components/Buttons/MenuButton";
import Button from "../../components/Buttons/Button";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { useFetch } from "../../hooks/useFetch";
import AddVehiclePopUp from "../../components/PopUp/AddVehiclePopUp";
import { Ride, Route, ScreenNavigationProps } from "../../types";
import AvailableRideCard from "../../components/Cards/AvailableRideCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const RidesScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  const [rides, setRides] = useState<Route[] | undefined>([]);
  const [ridesD, setRidesD] = useState<Route[] | undefined>([]);
  const [ridesP, setRidesP] = useState<Route[] | undefined>([]);
  const [fetchData, updateData, setData, getUserRidesAsPassenger, getUserRidesAsDriver] = useFetch();
  const [getUser, setUser, removeValue, setRidesAsDriver, setRidesAsPassenger, getRidesAsDriver, getRidesAsPassenger] = useAsyncStorage();
  const [changeView, setView] = useState<boolean>(true);
  useEffect(() => {
    getUserRides();
  }, []);

  const getUserRides = async () => {
    const user = await getUser();
    console.log("user id " + user.id + "\n");
    const rad = await getUserRidesAsDriver(user.id);
    const rap = await getUserRidesAsPassenger(user.id);
    if (rad !== undefined && rap !== undefined) {
      console.log(JSON.stringify(rad));
      console.log(JSON.stringify(rap));
      setRidesAsPassenger(rap);
      setRidesAsDriver(rad);
      setRidesD(rad);
      setRidesP(rap);
      setRides(rad);
    }

  };

  function retrieveRidesAsDriver() {
    rides?.map((ride) => {
      < View style={styles.footer} >
      <ScrollView style={{ height: 280 }}>

        {changeView ? rides?.map((ride) => {
          return (<AvailableRideCard route={ride} chooseRoute={() => { }}
          ></AvailableRideCard>);
        }) : ridesP?.map((ride) => {
          return (<AvailableRideCard route={ride} chooseRoute={() => { }}
          ></AvailableRideCard>);
        })}


      </ScrollView>
      {/* <View style={styles.buttons}>
        <Button
          full={true}
          loading={loading}
          correct={correct}
          press={() => {
            setVisible(true);
          }}
          text={"Add a vehicle"}
        />
      </View> */}
    </View >
    });
  }

  return (<SafeAreaView style={styles.container}>
    <MenuButton navigation={navigation} />
    <View style={styles.profileDetails}>
      <Image
        style={styles.profilePic}
        source={require("../../assets/images/driver.png")}
      />
      <Text style={styles.profileName}>Your rides</Text>
      {(rides !== undefined) && <Text style={styles.memberSince}>

        Total of {rides.length} rides
        </Text>}
      {(rides === undefined) && <Text style={styles.memberSince}>

        Currently you have no registered rides
        </Text>}

    </View>
    <View style={{
      flexDirection: 'row', justifyContent: 'space-evenly',
      alignItems: 'center', height: 60
    }}>
      <TouchableOpacity style={changeView ? styles.button : styles.button2} onPress={() => { setView(true),setRides(ridesD)}}>
        <Text style={changeView ? styles.text1 : styles.text2}>
          As a driver
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={!changeView ? styles.button : styles.button2} onPress={() => { setView(false),setRides(ridesP) }}>
        <Text style={!changeView ? styles.text1 : styles.text2}>
          As a passenger
        </Text>
      </TouchableOpacity>
    </View>
     <View style={styles.footer}>
      <ScrollView style={{ height: 280 }}>
 
        {rides?.map((ride) => {
          return (<AvailableRideCard route={ride} chooseRoute={() => { }}
          ></AvailableRideCard>);
        })}


      </ScrollView>
       {/* <View style={styles.buttons}>
        <Button
          full={true}
          loading={loading}
          correct={correct}
          press={() => {
            setVisible(true);
          }}
          text={"Add a vehicle"}
        />
      </View>  */}
    </View> 
  </SafeAreaView>);
}

export default RidesScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fd4d4d", alignSelf: 'center', flex: 0.5, height: 100, borderRadius: 50, width: 150, padding: 10
  },
  button2: {
    backgroundColor: "white", alignSelf: 'center', flex: 0.5, height: 100, borderRadius: 50, width: 150, padding: 10
  },
  text1: {
    color: 'white', textAlign: 'center'
  },
  text2:
    { color: "#fd4d4d", fontSize: 14, textAlign: 'center' }
  ,
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  footer: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  footer_text: {
    fontSize: 18,
    color: "#151a21",
    marginLeft: 5,
  },
  footer_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    zIndex: -1,
  },
  profileName: {
    color: "#a3a3a3",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  profilePic: {
    height: 150,
    width: 250,
    marginTop: 20,
  },
  memberSince: {
    color: "#fd4d4d",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#151a21",
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttons: {
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  rightAction: {
    backgroundColor: "#fd4d4d",
    borderTopRightRadius: 30,
    flex: 1,
    alignSelf: "center",
  },
  actionIcon: {
    color: "#fff",
    alignSelf: "center",
    flex: 1,
    padding: 20,
  },
});