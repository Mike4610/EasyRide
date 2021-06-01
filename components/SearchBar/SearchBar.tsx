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
  setAddressLocation?: (address: string) => void;
  placeholder: string;
  from?: Place;
  to?: Place;
}
const SearchBar: React.FC<Props> = ({
  visible,
  setAddressLocation,
  placeholder,
  from,
  to,
}) => {
  const setLocation = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    console.log(details?.formatted_address);
    if (details?.description === "Home" || details?.description === "Work") {
    } else {
      if (from) {
        from.latitude = details?.geometry.location.lat || 0;
        from.longitude = details?.geometry.location.lng || 0;
        from.description = details?.formatted_address;
      } else if (to) {
        to.latitude = details?.geometry.location.lat || 0;
        to.longitude = details?.geometry.location.lng || 0;
        to.description = details?.formatted_address;
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
    color: "#fd4d4d",
    fontWeight: "bold",
  },
  row: {
    backgroundColor: "white",
    borderColor: "#151a21",
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
});
