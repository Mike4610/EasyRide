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
import { Avatar } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { User } from "../../types";
import { UserContext } from "../../context/UserContext";
import { ProfileContext } from "../../context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import firebase from "firebase";
import "firebase/auth";

interface Props {
  drawerProps: DrawerContentComponentProps<DrawerContentOptions>;
}
const DrawerContent: React.FC<Props> = ({ drawerProps }) => {
  const [fullName, setFullName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [label, setLabel] = useState<string>("");
  //@ts-ignore
  const { setLoggedIn } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);
  const [getUser, setUser, removeUser] = useAsyncStorage();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
    console.log("update")
  }, [profile]);

  const getUserData = async () => {
    const user = await getUser();
    if (user !== null) {
      const { fullName, profileImgURL } = user;
      console.log(profileImgURL)
      setFullName(fullName);
      setImgURL(profileImgURL);
    }

    if (imgURL === "") {
      const label = getUserLabel(user);
      setLabel(label[0] + label[1]);
    }
  };

  const getUserLabel = (user: User) => {
    let n = user.fullName.split(" ");
    return [n[0][0], n[n.length - 1][0]];
  };

  const handleSignOut = () => {
    console.log("click");
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await removeUser();
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        {imgURL === "" ? (
          <Avatar.Text
            color="#a3a3a3"
            size={60}
            label={label}
            style={{ backgroundColor: "#fd4d4d" }}
          />
        ) : (
          <Image style={styles.profilePic} source={{ uri: imgURL }} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>{fullName}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...drawerProps}>
        {/* @ts-ignore */}
        <DrawerItemList {...drawerProps} />
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
};

export default DrawerContent;

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
