import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../../components/Buttons/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/app";
import DatePicker from "@react-native-community/datetimepicker";
import "firebase/auth";
import { emailValidator, passwordValidator, nameValidator } from "../../utils";
import { Snackbar } from "react-native-paper";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const recaptchaVerifierRef: any = useRef(null);
  const onDismissSnackBar = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "+351",
    birthDate: "",
    password: "",
  });
  const [titleDate, setTitleDate] = useState("Select Birth Date");
  const [date,setDate] = useState(new Date())
  const handleSignUp = () => {
    if (emailValidator(user.email) !== "") {
      setVisible(true);
      setMessage(emailValidator(user.email));
      return;
    }
    if (passwordValidator(user.password) !== "") {
      setVisible(true);
      setMessage(passwordValidator(user.password));
      return;
    }
    if (nameValidator(user.fullName) !== "") {
      setVisible(true);
      setMessage(nameValidator(user.fullName));
      return;
    }
    if (!validateAge()) {
      setVisible(true);
      setMessage("You're under age!");
      return;
    }
    validatePhoneNumber();
  };

  const validatePhoneNumber = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    //@ts-ignore
    phoneProvider
      .verifyPhoneNumber(user.phoneNumber, recaptchaVerifierRef.current)
      .then((verificationId: any) => {
        console.log("VerificationID:");
        console.log(verificationId);
        navigation.navigate("VerifyPhoneNumber", {
          userData: user,
          verificationId: verificationId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateAge = () => {
    var today = new Date();
    var birth = new Date(user.birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        //@ts-ignore
        firebaseConfig={firebase.app().options}
        title="Prove you are human!"
      />

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
            placeholderTextColor="#151a21"
            style={styles.textInput}
            onChangeText={(text) => setUser({ ...user, fullName: text })}
            value={user.fullName}
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
            autoCompleteType="email"
            placeholder="Your Email"
            placeholderTextColor="#151a21"
            style={styles.textInput}
            onChangeText={(text) => setUser({ ...user, email: text })}
            value={user.email}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.footer_text}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="phone" size={24} color="#151a21" />
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Your Phone Number"
            placeholderTextColor="#151a21"
            style={styles.textInput}
            onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
            value={user.phoneNumber}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.footer_text}>Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#151a21" />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#151a21"
            style={styles.textInput}
            onChangeText={(text) => setUser({ ...user, password: text })}
            value={user.password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.footer_text}>Birth Date</Text>
        <View style={styles.inputContainer}>

          <AntDesign name="calendar" size={24} color="#151a21" />
          {Platform.OS === 'ios' && (<DatePicker
            display='default'
            style={styles.datePickerStyle}
            value={date}
            mode="date"
            onChange={(e, d) => {
              //setShow(false);
              if (d !== undefined) {
                setUser({ ...user, birthDate: d.toDateString() })
                console.log(d.toLocaleDateString())
                setDate(d)
                //setTitleDate(d.toLocaleDateString())
              }
            }}
          />)}
          {Platform.OS==='android' &&  <TouchableOpacity style={styles.textInput} onPress={() => setShow(!show)} >
            <Text>{titleDate}</Text>
          </TouchableOpacity>
      
          }{show && <DatePicker
            display='default'
            style={styles.datePickerStyle}
            value={new Date()}
            mode="date"
            onChange={(e, d) => {
              setShow(false);
              if (d !== undefined) {
                setUser({ ...user, birthDate: d.toDateString() })
                setTitleDate(d.toLocaleDateString())
              }
            }}
          />}
        </View>
        <View style={styles.buttons}>
          <Button full={false} text={"Sign Up"} press={handleSignUp} />
          <Button
            full={true}
            text={"Sign In"}
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
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
    marginTop: 30,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    backgroundColor: "white",
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
    alignItems: "center"
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
  datePickerStyle: {
    marginLeft: 20,
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#fd4d4d",
    color: "black",
    padding: 12,
  },
});
