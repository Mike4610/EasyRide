import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../../components/Buttons/Button";
import { UserContext } from "../../context/UserContext";
import { ScreenNavigationProps } from "../../types";

const SplashScreen: React.FC<ScreenNavigationProps> = ({ navigation }) => {
  // @ts-ignore
  const { setLoggedIn } = useContext(UserContext);
  useEffect(() => {
    setLoggedIn(false);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/RMLogo.png")}
          ></Image>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.illustrationContainer}>
          <Image
            style={styles.illustration}
            source={require("../../assets/images/splash.png")}
          ></Image>
        </View>
        <Text style={styles.title_text}>
          Free rides, with <Text style={{ color: "#fd4d4d" }}>Easy</Text>Ride!
        </Text>
        <Text style={styles.subtitle_text}>
          Meet new people. Give or request a ride.
        </Text>
        <View style={styles.buttons}>
          <Button
            full={true}
            press={() => {
              navigation.navigate("SignIn");
            }}
            text={"Get started"}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151a21",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    width: 355,
    height: 100,
  },
  footer: {
    backgroundColor: "white",
    flex: 2,
    justifyContent: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 250,
    height: 180,
  },
  title_text: {
    fontSize: 25,
    marginTop: 30,
    color: "#151a21",
    fontWeight: "bold",
    alignSelf: "center",
  },
  subtitle_text: {
    fontSize: 18,
    color: "#a3a3a3",
    alignSelf: "center",
  },
  buttons: {
    marginTop: 40,
  },
});
