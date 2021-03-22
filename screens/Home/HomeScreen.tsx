import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/auth";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
        <TouchableOpacity style={{flex: 1, marginTop: 20}}onPress={()=>{navigation.openDrawer()}}>
            <Ionicons name="menu" size={40} color="#fd4d4d" />
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttons}>
          <FullButton text={"Request Ride"} />
          <OutlinedButton text={"Give Ride"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 2,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    flex:1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    
  },
//   logo: {
//     width: 100,
//     height: 100,
//     flex: 1
//   },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    backgroundColor: "white",
    flex: 1,
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
