import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { Place, User } from "../../types";
import { GOOGLE_API_KEY } from "../../googleConfig";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { Location } from "../../types";

const geofire = require('geofire-common');
interface Props {
  visible: boolean;
  placeholder: string;
  location: Place;
}
const SearchBar: React.FC<Props> = ({ visible, placeholder, location }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userLocations, setUserLocations] = useState<Place[]>([]);
  const [getUser] = useAsyncStorage();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    setLocations();
  }, [userData]);

  const setLocations = () => {
    let predifinedPlaces = [] as Place[];
    if (userData?.locations.length)
      userData.locations.forEach(
        ({ name, place: { latitude, longitude } }: Location) => {
          predifinedPlaces.push({
            description: name,
            latitude: latitude,
            longitude: longitude,
          });
        }
      );
    setUserLocations(predifinedPlaces);
  };

  const setLocation = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    const results = userData?.locations.filter(
      (location) => location.name === details?.description
    );
    // console.log("RESULTS", results)
    if (results?.length) {
      location.latitude = results[0].place.latitude;
      location.longitude = results[0].place.longitude;
      location.description = results[0].place.description;
      location.geoHash = geofire.geohashForLocation([results[0].place.latitude, results[0].place.longitude]);
    } else {
      location.latitude = details?.geometry.location.lat || 0;
      location.longitude = details?.geometry.location.lng || 0;
      location.description = details?.formatted_address;
      location.geoHash = geofire.geohashForLocation([details?.geometry.location.lat, details?.geometry.location.lng]);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        predefinedPlaces={userLocations}
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

    zIndex: 0,
  },
  predefinedPlacesDescription: {
    color: "#fd4d4d",
    fontWeight: "bold",
  },
  row: {
    zIndex: 1,
    borderRadius: 10,

    backgroundColor: "white",
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
});
