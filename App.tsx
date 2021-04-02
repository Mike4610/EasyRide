import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/Splash/SplashScreen";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
//@ts-ignore
import VerifyPhoneNumberScreen from "./screens/Auth/VerifyPhoneNumberScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { UserContext } from "./context/UserContext";
import DrawerContent from "./components/Drawer/DrawerContent";
import firebase from "firebase/app";
import AsyncStorage from "@react-native-community/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import VehiclesScreen from "./screens/Vehicles/VehiclesScreen";
import Loading from "./components/Loading/Loading";
import { firebaseConfig } from "./firebaseConfig";

export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const [loggedIn, setLoggedIn] = useState(null);
  const getUser = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      if (uid !== null) {
        // @ts-ignore
        setLoggedIn(true);
      } else {
        // @ts-ignore
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    getUser();
  }, []);

  if (loggedIn === null) {
    return <Loading />;
  } else if (!loggedIn) {
    return (
      <SafeAreaProvider>
        {/* @ts-ignore */}
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="VerifyPhoneNumber"
                component={VerifyPhoneNumberScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        {/* @ts-ignore */}
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="HomeScreen"
              drawerContent={(props) => <DrawerContent {...props} />}
              drawerContentOptions={{
                activeTintColor: "#fd4d4d",
                inactiveTintColor: "#151a21",
              }}
            >
              <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  drawerLabel: ({ focused, color }) => (
                    <Text style={{ fontSize: 16, color: "#151a21" }}>Home</Text>
                  ),
                  drawerIcon: ({ focused, color, size }) => (
                    <AntDesign name="home" size={24} color="#fd4d4d" />
                  ),
                }}
              />
              <Drawer.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                  drawerLabel: ({ focused, color }) => (
                    <Text style={{ fontSize: 16, color: "#151a21" }}>
                      Profile
                    </Text>
                  ),
                  drawerIcon: ({ focused, color, size }) => (
                    <AntDesign name="user" size={24} color="#fd4d4d" />
                  ),
                }}
              />
              <Drawer.Screen
                name="VehiclesScreen"
                component={VehiclesScreen}
                options={{
                  drawerLabel: ({ focused, color }) => (
                    <Text style={{ fontSize: 16, color: "#151a21" }}>
                      Vehicles
                    </Text>
                  ),
                  drawerIcon: ({ focused, color, size }) => (
                    <AntDesign name="car" size={24} color="#fd4d4d" />
                  ),
                }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
