import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Dialog, Portal, Provider } from "react-native-paper";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { User } from "../../types";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { Snackbar } from "react-native-paper";
import DatePicker from "@react-native-community/datetimepicker";
export default function EditProfilePopUp({
  user,
  getUserDetails,
  visible,
  onDismiss,
}: {
  user: User;
  getUserDetails: () => void;
  visible: boolean;
  onDismiss: () => void;
}) {
  //@ts-ignore
  const { setLoggedIn } = useContext(UserContext);
  const [userData, setUserData] = useState<User>({
    id: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    createdAt: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [buttonState, setButtonState] = useState({
    loading: false,
    correct: false,
    error: false,
  });
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const updateEmail = (id: string, obj: object) => {
    setButtonState({ ...buttonState, loading: true });
    const userCredential = firebase.auth().currentUser;
    console.log(userCredential);
    userCredential
      ?.updateEmail(userData.email)
      .then(() => {
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(id)
          .update(obj)
          .then(async () => {
            user.email = userData.email;
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setButtonState({ ...buttonState, loading: false, correct: true });
            getUserDetails();
            setSnackBarVisible(true);
            await sleep(2000);
            await AsyncStorage.clear();
            setLoggedIn(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const updateProfile = (id: string, obj: object) => {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(id)
      .update(obj)
      .then(async () => {
        user.fullName = userData.fullName;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        getUserDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateProfileHandler = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser !== null) {
      const { id } = JSON.parse(storedUser);
      console.log(id);

      if (userData.fullName !== "") {
        updateProfile(id, { fullName: userData.fullName });
      }
      if (userData.phoneNumber !== "") {
        updateProfile(id, { phoneNumber: userData.phoneNumber });
      }
      if (userData.birthDate !== "") {
        updateProfile(id, { birthDate: userData.birthDate });
      }
      if (userData.email !== "") {
        updateEmail(id, { email: userData.email });
      } else {
        onDismiss();
      }
    }
  };

  return (
    <Provider>
      <Portal>
        <Dialog
          style={styles.editProfilePopup}
          visible={isVisible}
          onDismiss={() => {
            onDismiss();
          }}
        >
          <Dialog.Content>
            <KeyboardAwareScrollView style={{ height: 370 }}>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Name</Text>
                <TextInput
                  placeholder={user.fullName}
                  placeholderTextColor="#151a21"
                  style={styles.textInput}
                  onChangeText={(fullName) => {
                    setUserData({ ...userData, fullName });
                  }}
                  value={userData.fullName}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Email</Text>
                <TextInput
                  placeholder={user.email}
                  placeholderTextColor="#151a21"
                  style={styles.textInput}
                  onChangeText={(email) => {
                    setUserData({ ...userData, email });
                  }}
                  value={userData.email}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Phone Number</Text>
                <TextInput
                  placeholder={user.phoneNumber}
                  placeholderTextColor="#151a21"
                  style={styles.textInput}
                  onChangeText={(phoneNumber) => {
                    setUserData({ ...userData, phoneNumber });
                  }}
                  value={userData.phoneNumber}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.popup_title}>Birth Date</Text>

                <DatePicker
                  style={styles.datePickerStyle}
                  value={new Date(user.birthDate)}
                  mode="date"
                  onChange={(e, d) => {
                    if (d !== undefined) {
                      user.birthDate = d.toDateString();
                    }
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.buttons}>
              <Button
                full={true}
                loading={buttonState.loading}
                correct={buttonState.correct}
                error={buttonState.error}
                press={updateProfileHandler}
                text={"Update Profile"}
              />
            </View>
          </Dialog.Content>
        </Dialog>
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
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Logging out ...
          </Text>
        </Snackbar>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  buttons: {
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  editProfilePopup: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 500,
    alignSelf: "center",
  },
  changeEmailPasswordPopup: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 320,
    height: 320,
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
    textAlign: "center",
  },
  popup_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
    marginBottom: 20,
  },
  datePickerStyle: {
    height: 40,
    width: 250,
    padding: 12,
    alignSelf: "center",
  },
});
