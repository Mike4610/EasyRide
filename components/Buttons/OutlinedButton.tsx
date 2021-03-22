import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OutlinedButton({text, press} : {text: String, press: Function}) {
  return (
    <TouchableOpacity onPress={press} style={styles.btn}>
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "white",
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fd4d4d",
        marginBottom: 20
      },
      btnTxt: {
        fontWeight: "bold",
        color: "#fd4d4d",
      },
})
