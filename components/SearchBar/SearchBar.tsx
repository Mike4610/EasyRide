import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function SearchBar() {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState("");

  const handleTextChange = (text: string) => {
    if (text === "") {
      console.log("hey");
      setLocation(text);
      setVisible(false);
    }
    setLocation(text);
    setVisible(true);
  };

  const handleEraseText = () => {
    setLocation("");
    setVisible(false);
  };

  const changeMapRegion = () => {};

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <AntDesign name="search1" size={20} color="#fd4d4d" />
      </View>

      <TextInput
        placeholder="Type a location"
        placeholderTextColor="#151a21"
        style={styles.input}
        value={location}
        onChangeText={(text) => {
          handleTextChange(text);
        }}
        onKeyPress={(event) => {
          if (event.nativeEvent.key == "Enter") {
            changeMapRegion();
          }
        }}
      ></TextInput>

      <View style={visible ? styles.showCross : styles.hideCross}>
        <TouchableOpacity onPress={handleEraseText}>
          <Entypo name="cross" size={24} color="#fd4d4d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    color: "black",
    borderRadius: 30,
    backgroundColor: "white",
    height: 45,
    marginTop: 75,
    width: 300,
    textAlign: "center",
  },
  searchBar: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    alignSelf: "center",
    flex: 1,
    zIndex: 0,
  },
  showCross: {
    marginTop: 85,
    marginLeft: -30,
    display: "flex",
  },
  hideCross: {
    display: "none",
  },
  searchIcon: {
    marginTop: 85,
    marginRight: -30,
  },
});