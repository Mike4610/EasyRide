import React, { useState} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        console.log(response);
        const uid = response.user.uid;
        console.log(uid);
        const data = {
          id: uid,
          email,
          fullName,
          phoneNumber,
          createdAt: new Date().toDateString(),
          vehicles: []
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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/RMLogo.png")}
          ></Image>
        </View>
        <Text style={styles.headerTitle}>
          Not a member yet<Text style={{ color: "#fd4d4d" }}>?</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Name</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} color="#151a21" />
          <TextInput
            placeholder="First and Last Name"
            style={styles.textInput}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.footer_text}>Email</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#151a21"
          />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.footer_text}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="phone" size={24} color="#151a21" />
          <TextInput
            placeholder="Your Phone Number"
            style={styles.textInput}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.footer_text}>Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#151a21" />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttons}>
          <OutlinedButton text={"Sign Up"} press={handleSignUp} />
          <FullButton
            text={"Sign In"}
            press={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 0.5,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: 20,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    backgroundColor: "white",
    flex: 2.5,
    justifyContent: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
