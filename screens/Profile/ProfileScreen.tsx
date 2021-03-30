import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import MenuButton from "../../components/Buttons/MenuButton";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import EditProfilePopUp from "../../components/PopUp/EditProfilePopUp";
import { User } from "../../types";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [userData, setUserData] = useState<User>({
    fullName: "",
    email: "",
    phoneNumber: "",
    createdAt: ""
  })
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const fullName = await AsyncStorage.getItem("fullName");
    const phoneNumber = await AsyncStorage.getItem("phoneNumber")
    const email = await AsyncStorage.getItem("email");
    let createdAt = await AsyncStorage.getItem("createdAt")
    createdAt = createdAt?.slice(3, createdAt.length) || ""

    setUserData({
      fullName,
      phoneNumber,
      email,
      createdAt
    })
  };
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={navigation} />

      <View style={styles.profileDetails}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/avatar.png")}
        />
        <Text style={styles.profileName}>{userData.fullName}</Text>
        <Text style={styles.memberSince}>Member since {userData.createdAt}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{height: 280}}>
          <View style={styles.infoContainer}>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.footer_title}>Email</Text>
            </View>
            <View style={styles.info}>
              <MaterialCommunityIcons
                name="email-outline"
                size={28}
                color="#fd4d4d"
              />
              <Text style={styles.footer_text}>{userData.email}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.footer_title}>Phone Number</Text>
            </View>
            <View style={styles.info}>
              <AntDesign name="phone" size={28} color="#fd4d4d" />
              <Text style={styles.footer_text}>+351 {userData.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttons}>
          <FullButton
            press={() => {
              setVisible(true);
            }}
            text={"Edit Profile"}
          />
          <OutlinedButton press={() => {}} text={"Reset Password"} />
        </View>
      </View>
      <EditProfilePopUp
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
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
  },
  profileDetails: {
    marginTop: 30,
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
    borderRadius: 50,
    height: 100,
    width: 100,
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
});
