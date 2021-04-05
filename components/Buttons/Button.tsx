import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";

interface Props {
  text: string;
  press: () => void;
  loading?: boolean;
  correct?: boolean;
  error?: boolean;
  full: boolean;
}

const Button: React.FC<Props> = ({
  text,
  press,
  loading,
  correct,
  error,
  full,
}) => {
  return (
    <TouchableOpacity
      onPress={press}
      style={full ? styles.fullButton : styles.outlinedButton}
    >
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={full ? "white" : "#fd4d4d"}
        />
      ) : correct ? (
        <AntDesign name="check" size={24} color={full ? "white" : "#fd4d4d"} />
      ) : error ? (
        <Feather name="x" size={24} color={full ? "white" : "#fd4d4d"} />
      ) : (
        <Text style={full ? styles.fullTxt : styles.outlinedTxt}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  fullButton: {
    backgroundColor: "#fd4d4d",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  outlinedButton: {
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
  fullTxt: {
    fontWeight: "bold",
    color: "white",
  },
  outlinedTxt: {
    fontWeight: "bold",
    color: "#fd4d4d",
  },
});
