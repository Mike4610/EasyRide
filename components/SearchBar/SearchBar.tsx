import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

export default function SearchBar({
  visible,
  setAddressLocation,
}: {
  visible: boolean;
  setAddressLocation: (address: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  //   const handleTextChange = (text: string) => {
  //     if (text === "") {
  //       console.log("hey");
  //       setSearchLocation(text);
  //       setVisible(false);
  //     }
  //     setSearchLocation(text);
  //     setVisible(true);
  //   };

  //   const handleEraseText = () => {
  //     setSearchLocation("");
  //     setVisible(false);
  //   };

  //   return (
  //     <View style={styles.searchBar}>
  //       <View style={styles.searchIcon}>
  //         <AntDesign name="search1" size={20} color="#fd4d4d" />
  //       </View>

  //       <TextInput
  //         placeholder="Type a location"
  //         placeholderTextColor="#151a21"
  //         style={styles.input}
  //         value={searchLocation}
  //         onChangeText={(text) => {
  //           handleTextChange(text);
  //         }}
  //         onSubmitEditing = {()=>{
  //             setAddressLocation(searchLocation)
  //         }}
  //       ></TextInput>

  //       <View style={visible ? styles.showCross : styles.hideCross}>
  //         <TouchableOpacity onPress={handleEraseText}>
  //           <Entypo name="cross" size={24} color="#fd4d4d" />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Where to?"
        minLength={2}
        isRowScrollable={true}
        fetchDetails={true}
        textInputHide={isVisible ? false : true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        styles={styles}
        query={{
          key: "AIzaSyCk08TOprTNr1B9tIrztczcoqEcgtCJpVM",
          language: "pt",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 20,
    marginTop: 75,
    zIndex: 0
  },
  textInput: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
    color: "#151a21",
    height: 45,
  },
  predefinedPlacesDescription: {
    color: "#151a21",
  },
  row: {
    backgroundColor: "#FFFFFF",
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
});
