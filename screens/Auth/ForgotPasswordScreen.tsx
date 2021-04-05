import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import Button from "../../components/Buttons/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";
import { ScreenNavigationProps } from "../../types";

const ForgotPasswordScreen: React.FC<ScreenNavigationProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  //SNACKBAR
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismissSnackBar = () => setVisible(false);
  const sleep = (ms: Number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(async () => {
        setEmail("");
        setMessage("Check your email!");
        setVisible(true);
        await sleep(3500);
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setMessage("Error. Invalid email address.");
          setVisible(true);
        }
        if (error.code === "auth/user-not-found") {
          setMessage("Error. User not found.");
          setVisible(true);
        }
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
          Forgot your password<Text style={{ color: "#fd4d4d" }}>?</Text>
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
        <View style={styles.buttons}>
          <Button
            full={true}
            text={"Reset Password"}
            press={handleResetPassword}
          />
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

export default ForgotPasswordScreen;

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
