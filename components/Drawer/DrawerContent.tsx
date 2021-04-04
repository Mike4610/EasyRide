import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  StatusBar,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import "firebase/auth";

export default function DrawerContent({ ...props }) {
  const [fullName, setFullName] = useState("");
  const [imgURL,setImgURL] = useState("")
  //@ts-ignore
  const { setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      const { fullName,profileImgURL } = JSON.parse(user);
      setFullName(fullName || "");
      setImgURL(profileImgURL||"");
    }
  };
  const handleSignOut = () => {
    console.log("click");
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.clear();
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        {imgURL===''?(<Image
          style={styles.profilePic}
          source={require("../../assets/images/avatar.png")}
        />):(<Image
        style={styles.profilePic}
        source={{uri:imgURL}}
      />)}
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>{fullName}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {/* @ts-ignore */}
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          labelStyle={{ fontSize: 16, color: "#151a21" }}
          icon={({ color, size }) => (
            <AntDesign name="logout" size={24} color="#fd4d4d" />
          )}
          onPress={handleSignOut}
        />
      </DrawerContentScrollView>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/RMLogo.png")}
        ></Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 680,
  },
  profile: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#151a21",
    height: 140,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  profilePic: {
    borderRadius: 50,
    height: 65,
    width: 65,
    marginRight: 10,
  },
  profileName: {
    color: "#a3a3a3",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
  },
});
