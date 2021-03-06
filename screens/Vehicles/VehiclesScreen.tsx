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
import FullButton from "../../components/Buttons/FullButton";
import firebase from "firebase/app";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";
import AddVehiclePopUp from "../../components/PopUp/AddVehiclePopUp";
import { Vehicle } from "../../types";
import VehicleCard from "../../components/Cards/VehicleCard";

export default function VehiclesScreen({ navigation }: { navigation: any }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  //POPUP
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserVehicles();
  }, []);

  const getUserVehiclesFromFirebase = async (uid: string) => {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid)
      .get()
      .then(async (doc) => {
        //@ts-ignore
        await AsyncStorage.setItem(
          "user",
          //@ts-ignore
          JSON.stringify(doc.data())
        );
        getUserVehicles();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserVehicles = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      const { vehicles } = JSON.parse(user);
      //@ts-ignore
      if (vehicles !== null) {
        setVehicles(vehicles);
        setLoading(false);
      }
    }
  };

  const setUserVehicles = async (vehicle: Vehicle) => {
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const uid = await AsyncStorage.getItem("uid");
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid || "")
      .update({
        vehicles: arrayUnion(vehicle),
      })
      .then(() => {
        getUserVehiclesFromFirebase(uid || "");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterVehicle = (vehicle: Vehicle) => {
    console.log(vehicle);
    setLoading(true);
    setVisible(false);
    setUserVehicles(vehicle);
  };

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    const uid = await AsyncStorage.getItem("uid");
    console.log(uid);
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid || "")
      .update({
        vehicles: arrayRemove(vehicle),
      })
      .then(() => {
        getUserVehiclesFromFirebase(uid || "");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // @ts-ignore

    <SafeAreaView style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.profileDetails}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/driver.png")}
        />
        <Text style={styles.profileName}>Registered vehicles</Text>
        <Text style={styles.memberSince}>
          Total of {vehicles.length} vehicles
        </Text>
      </View>

      <View style={styles.footer}>
        <ScrollView style={{ height: 280 }}>
          {vehicles.map((vehicle, index) => {
            return (
              <VehicleCard
                key={vehicle.brand + vehicle.model + vehicle.licensePlate}
                vehicle={vehicle}
                handleDeleteVehicle={handleDeleteVehicle}
              />
            );
          })}
        </ScrollView>
        <View style={styles.buttons}>
          <FullButton
            loading={loading}
            press={() => {
              setVisible(true);
            }}
            text={"Add a vehicle"}
          />
        </View>
      </View>
      <AddVehiclePopUp
        onDismiss={() => {
          setVisible(false);
        }}
        visible={visible}
        handleRegisterVehicle={handleRegisterVehicle}
      />
    </SafeAreaView>
  );
}

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
    width: 290,
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
    borderBottomColor: "#a3a3a3",
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
