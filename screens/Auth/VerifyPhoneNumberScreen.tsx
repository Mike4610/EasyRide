import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function VerifyPhoneNumberScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [code, setCode] = useState("");
  const [user] = useState(route.params.userData)
  const [verificationId] = useState(route.params.verificationId)
  //SNACKBAR
  const [visible, setVisible] = useState(false);
  const [message] = useState("");
  const onDismissSnackBar = () => setVisible(false);
  
  useEffect(() => {
    console.log(user)
    console.log(verificationId)
  }, [])
  const handleConfirmCode = () => {
    console.log(user)
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        registerUser();
      });
  };

  const registerUser = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((response: any) => {
        console.log(response);
        const uid = response.user.uid;
        console.log(uid);
        const data = {
          id: uid,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          createdAt: new Date().toDateString(),
          birthDate: user.birthDate,
          vehicles: [],
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("SignIn");
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/RMLogo.png")}
          ></Image>
        </View>
        <Text style={styles.headerTitle}>
          Verify your phone<Text style={{ color: "#fd4d4d" }}>!</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Confirmation Code</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="cellphone-key"
            size={24}
            color="#151a21"
          />
          <TextInput
            placeholder="Your Code"
            onChangeText={(text) => setCode(text)}
            value={code}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttons}>
          <FullButton text={"Confirm"} press={handleConfirmCode} />
          <OutlinedButton
            text={"Cancel"}
            press={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
      <Snackbar
        duration={4000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: "#151a21" }}
        action={{
          label: "",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{message}</Text>
      </Snackbar>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: 30,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    backgroundColor: "white",
    flex: 2,
    justifyContent: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer_text: {
    fontSize: 18,
    marginTop: 30,
    color: "#151a21",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
  },
  buttons: {
    marginTop: 30,
  },
});
