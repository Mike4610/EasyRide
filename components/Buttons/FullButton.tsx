import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {AntDesign, Feather} from '@expo/vector-icons'
export default function FullButton({
  text,
  press,
  loading,
  correct,
  error,
}: {
  text: String;
  press: () => void;
  loading?: boolean;
  correct?: boolean;
  error?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(false);
  const [isError, setIsError] = useState<boolean | undefined>(false);

  useEffect(() => {
    setIsLoading(loading);
    setIsCorrect(correct);
    setIsError(error);
  }, [loading, correct, error]);

  if (isLoading) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <ActivityIndicator animating={true} color={"white"} />
      </TouchableOpacity>
    );
  } else if (isCorrect) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>
    );
  } else if (isError) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <Feather name="x" size={24} color="white" />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <Text style={styles.btnTxt}>{text}</Text>
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
