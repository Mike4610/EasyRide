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

interface Props {
  visible: boolean;
  placeholder: string;
  location?: Place;
}
const SearchBar: React.FC<Props> = ({ visible, placeholder, location }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userLocations, setUserLocations] = useState<Location[]>([]);
  const [getUser] = useAsyncStorage();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUserData(user);
    })();
  }, []);

  useEffect(() => {
    console.log("USER DATA", userData);
    let obj = {};
    let predifinedPlaces = [] as Location[];
    if (userData?.locations.length)
      userData.locations.forEach((userLocation: Location) => {
        obj = {
          description: userLocation.name,
          geometry: {
            location: {
              lat: userLocation.place.latitude,
              lng: userLocation.place.longitude,
            },
          },
        };
        predifinedPlaces.push(obj);
        obj = {};
      });
    setUserLocations(predifinedPlaces);
  }, [userData]);

  const setLocation = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    console.log("PRESSS");
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
        predefinedPlaces={userData ? userLocations : []}
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
<<<<<<< Updated upstream
    zIndex: -1,
=======
    zIndex: 0,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    
=======
    zIndex: 0,
>>>>>>> Stashed changes
  },
});
