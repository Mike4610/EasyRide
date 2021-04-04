import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function OutlinedButton({
  text,
  loading,
  correct,
  error,
  press,
}: {
  text: String;
  loading?: boolean;
  correct?: boolean;
  error?: boolean;
  press: () => void;
}) {
  useEffect(() => {
    setIsLoading(loading);
    setIsCorrect(correct);
    setIsError(error);
  }, [correct, loading, error]);

  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(false);
  const [isError, setIsError] = useState<boolean | undefined>(false);

  if (isLoading) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <ActivityIndicator animating={true} color={"#fd4d4d"} />
      </TouchableOpacity>
    );
  } else if (isCorrect) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <AntDesign name="check" size={24} color="#fd4d4d" />
      </TouchableOpacity>
    );
  } else if (isError) {
    return (
      <TouchableOpacity onPress={press} style={styles.btn}>
        <Feather name="x" size={24} color="#fd4d4d" />
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
    backgroundColor: "white",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fd4d4d",
    marginBottom: 20,
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#fd4d4d",
  },
});
