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
import { Snackbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    getUserDetails();
  }, []);

  const [userData, setUserData] = useState<User>({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
    birthDate: "",
  });
  const [visible, setVisible] = useState(false);
  const [buttonState, setButtonState] = useState({
    loading: false,
    correct: false,
  });
 const [snackBarVisible, setSnackBarVisible] = useState(false)


  const getUserDetails = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      const {
        id,
        fullName,
        email,
        phoneNumber,
        birthDate,
        createdAt,
      } = JSON.parse(user);
      setUserData({
        id,
        fullName,
        phoneNumber,
        email,
        createdAt,
        birthDate,
      });
    }
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const dismissSnackBar = () => {
   setSnackBarVisible(false)
  }

  const resetPasswordHandler = () => {
    setButtonState({ ...buttonState, loading: true });
    firebase
      .auth()
      .sendPasswordResetEmail(userData.email)
      .then(async () => {
        setButtonState({ ...buttonState, loading: false, correct: true });
        setSnackBarVisible(true)
        await sleep(1000);
        setButtonState({ ...buttonState, correct: false });
       setSnackBarVisible(false)
      });
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
          <OutlinedButton
            loading={buttonState.loading}
            correct={buttonState.correct}
            press={() => {
              resetPasswordHandler();
            }}
            text={"Reset Password"}
          />
        </View>
      </ScrollView>
      <EditProfilePopUp
        user={userData}
        getUserDetails={getUserDetails}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      />
      <Snackbar
        duration={1500}
        visible={snackBarVisible}
        onDismiss={dismissSnackBar}
        style={{ backgroundColor: "#151a21" }}
        action={{
          label: "",
          onPress: () => {
            dismissSnackBar();
          },
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Check your email!
        </Text>
      </Snackbar>
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
