import React, { useState, useContext } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchContext } from "../../context/SearchContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

interface Props {
  visible: boolean;
  setAddressLocation?: (address: string) => void;
  placeholder: string;
}
const SearchBar: React.FC<Props> = ({
  visible,
  setAddressLocation,
  placeholder,
}) => {
  const { setSearchLocation } = useContext(SearchContext);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        predefinedPlaces={[{description: "Home", geometry: {location: {lat: 0, lng: 0}}}]}
        placeholder={placeholder}
        minLength={2}
        isRowScrollable={true}
        fetchDetails={true}
        textInputHide={visible ? false : true}
        onPress={(data, details = null) => {
          if(details?.description === "Home" || details?.description === "Work"){
            console.log("hey")
          }
          //console.log(details?.geometry.location);
    
         // setSearchLocation(details?.geometry.location);
        }}
        styles={styles}
        query={{
          key: "AIzaSyCk08TOprTNr1B9tIrztczcoqEcgtCJpVM",
          language: "pt",
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 20,
    right: 20,
    top: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 20,
    marginTop: 75,
  },
  textInput: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
    color: "#151a21",
    height: 45,
    borderWidth: 1,
    borderColor: "#a3a3a3",
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
