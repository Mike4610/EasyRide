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
import VerifyPhoneNumberScreen from "./screens/Auth/VerifyPhoneNumberScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { UserContext } from "./context/UserContext";
import { ProfileContext } from "./context/ProfileContext";
import { VehicleContext } from "./context/VehicleContext";
import DrawerContent from "./components/Drawer/DrawerContent";
import firebase from "firebase/app";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import VehiclesScreen from "./screens/Vehicles/VehiclesScreen";
import Loading from "./components/Loading/Loading";
import { useAsyncStorage } from "./hooks/useAsyncStorage";
import { firebaseConfig } from "./firebaseConfig";
import LocationsScreen from "./screens/Locations/LocationsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RidesScreen from "./screens/Rides/RidesScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { LogBox } from "react-native";

const App: React.FC<{}> = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<boolean>(false);
  const [getUser] = useAsyncStorage();

  const isAuthenticated = async () => {
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    try {
      const user = await getUser();
      user !== null ? setLoggedIn(true) : setLoggedIn(false);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    isAuthenticated();
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
              <Stack.Screen
                name="Home"
                component={HomeScreen}
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
          <ProfileContext.Provider value={{ profile, setProfile }}>
            <VehicleContext.Provider value={{ vehicle, setVehicle }}>
              <NavigationContainer>
                <Drawer.Navigator
                  initialRouteName="HomeScreen"
                  drawerContent={(props) => (
                    <DrawerContent drawerProps={props} />
                  )}
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
                        <Text style={{ fontSize: 16, color: "#151a21" }}>
                          Home
                        </Text>
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
                  <Drawer.Screen
                    name="LocationsScreen"
                    component={LocationsScreen}
                    options={{
                      drawerLabel: ({ focused, color }) => (
                        <Text style={{ fontSize: 16, color: "#151a21" }}>
                          Locations
                        </Text>
                      ),
                      drawerIcon: ({ focused, color, size }) => (
                        <MaterialCommunityIcons
                          name="office-building"
                          size={24}
                          color="#fd4d4d"
                        />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="RidesScreen"
                    component={RidesScreen}
                    options={{
                      drawerLabel: ({ focused, color }) => (
                        <Text style={{ fontSize: 16, color: "#151a21" }}>
                          Rides
                        </Text>
                      ),
                      drawerIcon: ({ focused, color, size }) => (
                        <FontAwesome5 name="route" size={24} color="#fd4d4d" />
                      ),
                    }}
                  />
                </Drawer.Navigator>
              </NavigationContainer>
            </VehicleContext.Provider>
          </ProfileContext.Provider>
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
};

export default App;
