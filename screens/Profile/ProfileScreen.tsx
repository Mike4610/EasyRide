import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import MenuButton from "../../components/Buttons/MenuButton";
import FullButton from "../../components/Buttons/FullButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={navigation} />

      <View style={styles.profileDetails}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/avatar.png")}
        />
        <Text style={styles.profileName}>Micael Vieira</Text>
        <Text style={styles.memberSince}>Member since Mar 23 2021</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.footer_title}>Email</Text>
          </View>
          <View style={styles.info}>
            <MaterialCommunityIcons
              name="email-outline"
              size={28}
              color="#fd4d4d"
            />
            <Text style={styles.footer_text}>mike22vieiraa@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.footer_title}>Phone Number</Text>
          </View>
          <View style={styles.info}>
            <AntDesign name="phone" size={28} color="#fd4d4d" />
            <Text style={styles.footer_text}>916661494</Text>
          </View>
        </View>
        <View style={styles.buttons}>
            
          <FullButton press={()=>{}} text={"Change email"} />
          <OutlinedButton press={()=>{}} text={"Change password"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  footer_text: {
    fontSize: 18,
    color: "#151a21",
    marginLeft: 5,
  },
  footer_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
  },
  profileDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  profileName: {
    color: "#a3a3a3",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  profilePic: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  memberSince: {
    color: "#fd4d4d",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#a3a3a3",
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttons: {
    marginTop: 15,
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
});
