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
import AddLocationPopUp from "../../components/PopUp/AddLocationPopUp";
import { Location, ScreenNavigationProps } from "../../types";
import LocationCard from "../../components/Cards/LocationCard";


const LocationsScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  //POPUP
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(false);
  //CUSTOM HOOKS
  const [getUser, setUser] = useAsyncStorage();
  const [fetchData, updateData] = useFetch();

  useEffect(() => {
    getUserLocations();
  }, []);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getUserLocations = async () => {
    const locations = await getUser("locations");
    setLocations(locations);
    setLoading(false);
  };

  const setUserLocations = async (location: Location) => {
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const uid = await getUser("id");
    await updateData(uid, { locations: arrayUnion(location) });
    const response = await fetchData(uid);
    await setUser(response);
    getUserLocations();
    setCorrect(true);
    await sleep(1000);
    setCorrect(false);
  };

  const handleRegisterLocation = (location: Location) => {
    console.log(location);    
    setLoading(true);
    setVisible(false);
    setUserLocations(location);
  };

  const handleDeleteLocation = async (location: Location) => {
    console.log("delete")
    console.log(location)
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    const uid = await getUser("id");
    await updateData(uid, { locations: arrayRemove(location) });
    const updatedLocation = await fetchData(uid)
    setLocations(updatedLocation.locations)
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.profileDetails}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/locations.png")}
        />
        <Text style={styles.profileName}>Registered locations</Text>
        <Text style={styles.memberSince}>
          Total of {locations.length} locations
        </Text>
      </View>

      <View style={styles.footer}>
        <ScrollView style={{ height: 280 }}>
          {locations.map((location, index) => {
            return (
              <LocationCard
                key={location.name + location.description}
                location={location}
                handleDeleteLocation={handleDeleteLocation}
              />
            );
          })}
        </ScrollView>
        <View style={styles.buttons}>
          <Button
            full={true}
            loading={loading}
            correct={correct}
            press={() => {
              setVisible(true);
            }}
            text={"Add a location"}
          />
        </View>
      </View>
      <AddLocationPopUp
        onDismiss={() => {
          setVisible(false);
        }}
        visible={visible}
        handleRegisterLocation={handleRegisterLocation}
      />
    </SafeAreaView>
  );
}

export default LocationsScreen;

const styles = StyleSheet.create({
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
    width: 180,
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
