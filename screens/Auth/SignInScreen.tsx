import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import Button from "../../components/Buttons/Button";
import { UserContext } from "../../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { useFetch } from "../../hooks/useFetch";
import { ScreenNavigationProps } from "../../types";

const SignInScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // @ts-ignore
  const { setLoggedIn } = useContext(UserContext);
  const [getUser, setUser] = useAsyncStorage();
  const [fetchData] = useFetch();

  //SNACKBAR
  const [snackBarState, setSnackBarState] = useState({
    visible: false,
    message: "",
  });

  const [buttonState, setButtonState] = useState({
    loading: false,
    correct: false,
    error: false,
  });

  const dismissSnackBar = () =>
    setSnackBarState({ ...snackBarState, visible: false });

  const sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSignIn = () => {
    setButtonState({ ...buttonState, loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        setButtonState({ ...buttonState, loading: false, correct: true });
        await sleep(1000);
        storeData(response.user.uid);
      })
      .catch(async (error: any) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          setButtonState({ ...buttonState, loading: false, error: true });
          setSnackBarState({
            visible: true,
            message: "Error. Invalid email address.",
          });
          await sleep(2000);
          setButtonState({ ...buttonState, error: false });
        }
        if (error.code === "auth/wrong-password") {
          setButtonState({ ...buttonState, loading: false, error: true });
          setSnackBarState({
            visible: true,
            message: "Error. Wrong password.",
          });
          await sleep(2000);
          setButtonState({ ...buttonState, error: false });
        }
        if (error.code === "auth/user-not-found") {
          setButtonState({ ...buttonState, loading: false, error: true });
          setSnackBarState({
            visible: true,
            message: "Error. User not found.",
          });
          await sleep(2000);
          setButtonState({ ...buttonState, error: false });
        }
      });
  };

  const storeData = async (uid: any) => {
    try {
      const response = await fetchData(uid);
      await setUser(response);
      setLoggedIn(true);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
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
        <View>
          <Text style={styles.headerTitle}>
            Welcome<Text style={{ color: "#fd4d4d" }}>!</Text>
          </Text>
        </View>
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
            placeholderTextColor="#151a21"
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
            placeholderTextColor="#151a21"
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
          <Button
            full={true}
            text={"Sign In"}
            press={handleSignIn}
            {...buttonState}
          />
          <Button
            full={false}
            text={"Sign Up"}
            press={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </View>
      <Snackbar
        duration={1500}
        visible={snackBarState.visible}
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
          {snackBarState.message}
        </Text>
      </Snackbar>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 1,

    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
