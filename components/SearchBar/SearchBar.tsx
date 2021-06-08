import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { Place } from "../../types";
import { GOOGLE_API_KEY } from "../../googleConfig";

interface Props {
  visible: boolean;
  placeholder: string;
  location?: Place;
}
const SearchBar: React.FC<Props> = ({ visible, placeholder, location }) => {
  const setLocation = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    console.log(details?.formatted_address);
    if (details?.description === "Home" || details?.description === "Work") {
    } else {
      if (location) {
        location.latitude = details?.geometry.location.lat || 0;
        location.longitude = details?.geometry.location.lng || 0;
        location.description = details?.formatted_address;
      }
    }
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        predefinedPlaces={[
          { description: "Home", geometry: { location: { lat: 0, lng: 0 } } },
          { description: "Work", geometry: { location: { lat: 0, lng: 0 } } },
        ]}
        currentLocation={true}
        placeholder={placeholder}
        minLength={2}
        isRowScrollable={true}
        fetchDetails={true}
        textInputHide={visible ? false : true}
        onPress={setLocation}
        styles={styles}
        query={{
          key: GOOGLE_API_KEY,
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
    zIndex: -1,
  },
  predefinedPlacesDescription: {
    color: "#fd4d4d",
    fontWeight: "bold",
  },
  row: {
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#fd4d4d",
    padding: 13,
    height: 44,
    flexDirection: "row",
    
  },
});
