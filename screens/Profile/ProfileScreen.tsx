import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import MenuButton from "../../components/Buttons/MenuButton";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import ProfileCard from "../../components/Cards/ProfileCard";
import AsyncStorage from "@react-native-community/async-storage";
import EditProfilePopUp from "../../components/PopUp/EditProfilePopUp";
import { User } from "../../types";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [userData, setUserData] = useState<User>({
    fullName: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
    birthDate: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      const { fullName, email, phoneNumber, birthDate, createdAt } = JSON.parse(
        user
      );
      const created = createdAt?.slice(3, createdAt.length) || "";

      setUserData({
        fullName,
        phoneNumber,
        email,
        createdAt: created,
        birthDate,
      });
    }
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
        <Text style={styles.memberSince}>
          Member since {userData.createdAt}
        </Text>
      </View>
      <ScrollView style={styles.footer}>
        <ProfileCard
          title={"Email"}
          info={userData.email}
          icon={"email-outline"}
        />
        <ProfileCard
          title={"Phone Number"}
          info={userData.phoneNumber}
          icon={"phone"}
        />
        <ProfileCard
          title={"Birth Date"}
          info={userData.birthDate}
          icon={"calendar"}
        />
        <View style={styles.buttons}>
          <FullButton
            press={() => {
              setVisible(true);
            }}
            text={"Edit Profile"}
          />
          <OutlinedButton press={() => {}} text={"Reset Password"} />
        </View>
      </ScrollView>
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
  buttons: {
    marginTop: 20,
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
});
