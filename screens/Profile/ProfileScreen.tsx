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
import EditProfilePopUp from "../../components/PopUp/EditProfilePopUp";
import { User, ScreenNavigationProps } from "../../types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Snackbar, Avatar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";

const ProfileScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState<User>({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    profileImgURL: "",
    createdAt: "",
    vehicles: [],
  });
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [buttonState, setButtonState] = useState({
    loading: false,
    correct: false,
  });
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [getValue] = useAsyncStorage();

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
    const user = await getValue();
    if (user.profileImgURL === "") {
      const label = getUserLabel(user);
      setLabel(label[0] + label[1]);
    }
    console.log(user);
    setUserData(user);
    if (userData.profileImgURL === "") console.log(userData.fullName);
  };

  const getUserLabel = (user: User) => {
    let n = user.fullName.split(" ");
    return [n[0][0], n[n.length - 1][0]];
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
        {userData.profileImgURL === "" ? (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar.Text
              color="#a3a3a3"
              size={100}
              label={label}
              style={{ backgroundColor: "#fd4d4d" }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: 100,
              height: 100,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image
              style={styles.profilePic}
              source={{ uri: userData.profileImgURL }}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.profileName}>{userData.fullName}</Text>
        <Text style={styles.memberSince}>
          Member since {userData.createdAt}
        </Text>
      </View>
      <View style={styles.footer}>
        <ScrollView style={{ height: 200 }}>
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
        </ScrollView>
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
      </View>
      <EditProfilePopUp
        user={userData}
        getUserDetails={getUserDetails}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  memberSince: {
    color: "#fd4d4d",
    fontSize: 13,
    fontWeight: "bold",
  },
  buttons: {
    padding: 30,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
});
