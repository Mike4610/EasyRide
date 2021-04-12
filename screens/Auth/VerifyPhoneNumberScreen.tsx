import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import Button from "../../components/Buttons/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useFetch } from "../../hooks/useFetch";
import { ScreenNavigationProps, User } from "../../types";

const VerifyPhoneNumberScreen: React.FC<ScreenNavigationProps> = ({
  route,
  navigation,
}) => {
  const [code, setCode] = useState("");
  //@ts-ignore
  const [superUser] = useState(route.params.userData);
  //@ts-ignore
  const [verificationId] = useState(route.params.verificationId);
  //SNACKBAR
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [getData, changeData, setData] = useFetch();
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    console.log(superUser);
    console.log(verificationId);
  }, []);
  const handleConfirmCode = () => {
    setVisible(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        registerUser();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-verification-code") {
          setVisible(true);
          setMessage("Invalid verification code!");
        }
      });
  };

  const registerUser = async () => {
    const fullName = superUser.fullName;
    firebase
      .auth()
      .createUserWithEmailAndPassword(superUser.email, superUser.password)
      .then(({ user }: any) => {
        console.log("user" + user);
        const uid = user.uid;
        console.log(uid);
        const data = {
          id: uid,
          email: superUser.email,
          fullName: fullName,
          phoneNumber: superUser.phoneNumber,
          createdAt: new Date().toDateString(),
          birthDate: superUser.birthDate,
          vehicles: [],
          profileImgURL: "",
        };

        console.log("User info:\n");
        console.log(data);
        if (setData(uid, data)) {
          setVisible(false);
          navigation.navigate('SignIn');
        }
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
            keyboardType="number-pad"
            placeholder="Your Code"
            placeholderTextColor="#151a21"
            onChangeText={(text) => setCode(text)}
            value={code}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttons}>
          <Button full={true} text={"Confirm"} press={handleConfirmCode} />
          <Button
            full={false}
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
};

export default VerifyPhoneNumberScreen;

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
