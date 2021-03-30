import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import { UserContext } from "../../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // @ts-ignore
  const { setLoggedIn } = useContext(UserContext);
  //SNACKBAR
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismissSnackBar = () => setVisible(false);
  const [loading, setLoading] = useState(false)

  const handleSignIn = () => {
    setLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response: any) => {
        storeData(response.user.uid);
      })
      .catch((error: any) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          setMessage("Error. Invalid email address.");
          setVisible(true);
        }
        if (error.code === "auth/wrong-password") {
          setMessage("Error. Wrong password.");
          setVisible(true);
        }
        if (error.code === "auth/user-not-found") {
          setMessage("Error. User not found.");
          setVisible(true);
        }
      });
  };

  const storeData = async (uid: any) => {
    try {
      await AsyncStorage.setItem("uid", uid);
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then(async (doc) => {
          setLoading(false)
          setLoggedIn(true);
          navigation.navigate("Home");
          //@ts-ignore
          await AsyncStorage.setItem("fullName", doc.data().fullName);
          //@ts-ignore
          await AsyncStorage.setItem("email", doc.data().email);
          //@ts-ignore
          await AsyncStorage.setItem("createdAt", doc.data().createdAt);
          //@ts-ignore
          await AsyncStorage.setItem("vehicles", JSON.stringify(doc.data().vehicles));
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
          Welcome<Text style={{ color: "#fd4d4d" }}>!</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Email</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#151a21"
          />
          <TextInput
            placeholder="Your Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.footer_text}>Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#151a21" />
          <TextInput
            placeholder="Your Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={{ marginTop: 10 }}>
            Forgot <Text style={{ color: "#fd4d4d" }}>password</Text>?
          </Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <FullButton text={"Sign In"} press={handleSignIn} loading={loading}/>
          <OutlinedButton
            text={"Sign Up"}
            press={() => {
              navigation.navigate("SignUp");
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
    marginTop: 20,
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
