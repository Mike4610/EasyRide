import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function FullButton({
  text,
  press,
  loading,
}: {
  text: String;
  press: Function;
  loading?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (!isLoading) {
    return (
      //@ts-ignore
      <TouchableOpacity onPress={press} style={styles.btn}>
        <Text style={styles.btnTxt}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      //@ts-ignore
      <TouchableOpacity onPress={press} style={styles.btn}>
        <ActivityIndicator animating={true} color={"white"} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fd4d4d",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  btnTxt: {
    fontWeight: "bold",
    color: "white",
  },
});
