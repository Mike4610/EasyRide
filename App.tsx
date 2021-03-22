import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/Splash/SplashScreen";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { UserContext } from "./context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyDDJJKukPDp8mZ0AwZRACNceE000TsRXzc",
  authDomain: "easyride-cec49.firebaseapp.com",
  projectId: "easyride-cec49",
  storageBucket: "easyride-cec49.appspot.com",
  messagingSenderId: "813876382814",
  appId: "1:813876382814:web:72c2817517bb2747edf8cf",
  measurementId: "G-1YT8ZE3LSW",
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      console.log("FIREBASE INITIALIZED");
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    if (!loggedIn) {
      return (
        <SafeAreaProvider>
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
          <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            <NavigationContainer>
              <Drawer.Navigator
                initialRouteName="Home"
                drawerContentOptions={{
                  activeTintColor: "#fd4d4d",
                  inactiveTintColor: "#151a21",
                }}
              >
                <Drawer.Screen
                  name="Home"
                  component={HomeScreen}
                />
                <Drawer.Screen name="Profile" component={HomeScreen} />
                <Drawer.Screen name="Sign Out" component={SplashScreen} />
              </Drawer.Navigator>
            </NavigationContainer>
          </UserContext.Provider>
        </SafeAreaProvider>
      );
    }
  }
}
