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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import firebase from "firebase/app";
import "firebase/firestore";
import carList from "../../car-list.json";
import AsyncStorage from "@react-native-community/async-storage";
import AddVehiclePopUp from "../../components/PopUp/AddVehiclePopUp";
import {AddVehicleContext} from "../../context/AddVehicleContext";

export default function VehiclesScreen({ navigation }: { navigation: any }) {
  const [vehicles, setVehicles] = useState([]);

  //POPUP
  const [visible, setVisible] = useState(false);
  //PICKER
  // const seatNumbers = ["2", "3", "4", "5"];
  // const [brand, setBrand] = useState(carList[0].brand);
  // const [model, setModel] = useState(carList[0].models[0]);
  // const [seats, setSeats] = useState("2");
  // const [licensePlate, setLicensePlate] = useState("");
  // const [modelList, setModelList] = useState(carList[0].models);
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

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
          "vehicles",
          //@ts-ignore
          JSON.stringify(doc.data().vehicles)
        );
        getUserVehicles();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserVehicles = async () => {
    const vehicles = await AsyncStorage.getItem("vehicles");
    //@ts-ignore
    setVehicles(JSON.parse(vehicles));
  };

  const setUserVehicles = async (brand:any, model: any, seats: any, licensePlate: any) => {
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const uid = await AsyncStorage.getItem("uid");
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid || "")
      .update({
        vehicles: arrayUnion({
          brand,
          model,
          seats,
          licensePlate,
        }),
      })
      .then(() => {
        getUserVehiclesFromFirebase(uid || "");
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleBrandChange = (itemValue: any) => {
  //   carList.forEach(({ brand, models }) => {
  //     if (brand === itemValue) {
  //       setBrand(brand);
  //       setModel(models[0]);
  //       setModelList(models);
  //     }
  //   });
  // };

  const handleRegisterVehicle = (brand: any, model: any, seats: any, licensePlate: any) => {
    setUserVehicles(brand, model, seats, licensePlate);
    setVisible(false)
  };

  const handleDeleteVehicle = async (vehicle: object) => {
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

  // const VehiclePopUp = () => {
  //   return (
  //     <Provider>
  //       <Portal>
  //         <Dialog style={styles.popup} visible={visible} onDismiss={hideDialog}>
  //           <Dialog.Content>
  //             <KeyboardAwareScrollView style={{ height: 370 }}>
  //               <View style={styles.pickerContainer}>
  //                 <Text style={styles.popup_title}>Brand</Text>
  //                 <Picker
  //                   style={{ width: 250, height: 44 }}
  //                   itemStyle={{ height: 44 }}
  //                   selectedValue={brand}
  //                   onValueChange={(itemValue) => handleBrandChange(itemValue)}
  //                 >
  //                   {carList.map(({ brand }) => {
  //                     return (
  //                       <Picker.Item key={brand} label={brand} value={brand} />
  //                     );
  //                   })}
  //                 </Picker>
  //               </View>
  //               <View style={styles.pickerContainer}>
  //                 <Text style={styles.popup_title}>Model</Text>
  //                 <Picker
  //                   style={{ width: 250, height: 44 }}
  //                   itemStyle={{ height: 44 }}
  //                   selectedValue={model}
  //                   onValueChange={(itemValue) => setModel(itemValue)}
  //                 >
  //                   {modelList.map((item) => {
  //                     return (
  //                       <Picker.Item key={item} label={item} value={item} />
  //                     );
  //                   })}
  //                 </Picker>
  //               </View>
  //               <View style={styles.pickerContainer}>
  //                 <Text style={styles.popup_title}>Seat number</Text>
  //                 <Picker
  //                   style={{ width: 250, height: 44 }}
  //                   itemStyle={{ height: 44 }}
  //                   selectedValue={seats}
  //                   onValueChange={(itemValue) => setSeats(itemValue)}
  //                 >
  //                   {seatNumbers.map((number) => {
  //                     return (
  //                       <Picker.Item
  //                         key={number}
  //                         label={number}
  //                         value={number}
  //                       />
  //                     );
  //                   })}
  //                 </Picker>
  //               </View>
  //               <View style={styles.pickerContainer}>
  //                 <Text style={styles.popup_title}>License Plate</Text>
  //                 <TextInput
  //                   placeholder="AA-00-11"
  //                   placeholderTextColor="#151a21"
  //                   onChangeText={(text) => setLicensePlate(text)}
  //                   value={licensePlate}
  //                   style={styles.textInput}
  //                   autoCapitalize="none"
  //                 />
  //               </View>
  //             </KeyboardAwareScrollView>
  //             <View style={styles.buttons}>
  //               <FullButton press={handleRegisterVehicle} text={"Add"} />
  //             </View>
  //           </Dialog.Content>
  //         </Dialog>
  //       </Portal>
  //     </Provider>
  //   );
  // };

  return (
    // @ts-ignore
    <AddVehicleContext.Provider value={{visible, setVisible}}>
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
            {vehicles.map(({ brand, model, licensePlate, seats }) => {
              return (
                <GestureRecognizer
                  onSwipeLeft={() =>
                    handleDeleteVehicle({
                      brand,
                      model,
                      licensePlate,
                      seats,
                    })
                  }
                  config={config}
                >
                  <View key={licensePlate} style={styles.infoContainer}>
                    <View
                      style={{
                        marginTop: 20,
                      }}
                    >
                      <Text style={styles.footer_title}>
                        {brand} {model}
                      </Text>
                    </View>

                    <View style={styles.info}>
                      <AntDesign name="idcard" size={28} color="#fd4d4d" />
                      <Text style={styles.footer_text}>{licensePlate}</Text>
                    </View>
                    <View style={styles.info}>
                      <Ionicons
                        name="person-outline"
                        size={24}
                        color="#fd4d4d"
                      />
                      <Text style={styles.footer_text}>{seats}</Text>
                    </View>
                  </View>
                </GestureRecognizer>
              );
            })}
          </ScrollView>
          <View style={styles.buttons}>
            <FullButton press={()=>{setVisible(true)}} text={"Add a vehicle"} />
          </View>
        </View>
        <AddVehiclePopUp handleRegisterVehicle={handleRegisterVehicle} />
      </SafeAreaView>
    </AddVehicleContext.Provider>
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
  popup: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 500,
    alignSelf: "center",
  },
  pickerContainer: {
    alignItems: "center",
    height: 120,
    padding: 20,
  },
  textInput: {
    height: 40,
    width: 250,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
    alignSelf: "center",
  },
  popup_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
