import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
} from "react-native";
import MenuButton from "../../components/Buttons/MenuButton";
import Button from "../../components/Buttons/Button";
import ProfileCard from "../../components/Cards/ProfileCard";
import AsyncStorage from "@react-native-community/async-storage";
import EditProfilePopUp from "../../components/PopUp/EditProfilePopUp";
import { User } from "../../types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Snackbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState<User>({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
    birthDate: "",
    profileImgURL: "",
  });
  const [visible, setVisible] = useState(false);
  const [buttonState, setButtonState] = useState({
    loading: false,
    correct: false,
  });
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [getUser, setUser] = useAsyncStorage();

  useEffect(() => {
    getUserDetails();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  async function uploadImageAsync(uri: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child("profilePics/" + userData.id);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  const pickImage = async () => {
    requestPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const url = await uploadImageAsync(result.uri);
      console.log(url);
      const usersRef = firebase.firestore().collection("users");
      setUserData({ ...userData, profileImgURL: url });
      usersRef
        .doc(userData.id)
        .update({ profileImgURL: url })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const getUserDetails = async () => {
    const user = await getUser();
    setUserData(user);
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const resetPasswordHandler = () => {
    setButtonState({ ...buttonState, loading: true });
    firebase
      .auth()
      .sendPasswordResetEmail(userData.email)
      .then(async () => {
        setButtonState({ ...buttonState, loading: false, correct: true });
        setSnackBarVisible(true);
        await sleep(1000);
        setButtonState({ ...buttonState, correct: false });
        setSnackBarVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={navigation} />

      <View style={styles.profileDetails}>
        {userData.profileImgURL == "" ? (
          <Image
            style={styles.profilePic}
            source={require("../../assets/images/avatar.png")}
          />
        ) : (
          <Image
            style={styles.profilePic}
            source={{ uri: userData.profileImgURL }}
          />
        )}

        <TouchableOpacity
          onPress={pickImage}
          style={{ width: 40, height: 40, alignSelf: "center" }}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="image-plus"
            size={30}
            color="white"
          />
        </TouchableOpacity>
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
          <Button
            full={true}
            press={() => {
              setVisible(true);
            }}
            text={"Edit Profile"}
          />
          <Button
            full={false}
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
