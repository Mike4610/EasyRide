import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { RouteContext } from "../../context/RouteContext";
import { RequestRouteContext } from "../../context/RequestRouteContext";
import { CurrentRidesContext } from "../../context/CurrentRidesContext";
import RequestRidePopUp from "../../components/PopUp/RequestRidePopUp";
import GiveRidePopUp from "../../components/PopUp/GiveRidePopUp";
import Map from "../../components/Map/Map";
import MenuButton from "../../components/Buttons/MenuButton";
import FabButton from "../../components/Buttons/FabButton";
import { useFetch } from "../../hooks/useFetch";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import "firebase/auth";
import { Route, ScreenNavigationProps } from "../../types";
import { VehicleContext } from "../../context/VehicleContext";

const HomeScreen: React.FC<ScreenNavigationProps> = ({
  navigation,
  routeProp,
}) => {
  //POPUP
  const [requestVisible, setRequestVisible] = useState(false);
  const [giveVisible, setGiveVisible] = useState(false);
  const [ridesVisible, setRidesVisible] = useState(false);

  const [transform, setTransform] = useState({
    returnButton: false,
    closeButton: false,
  });
  const [myRidesAsPassenger, setMyRidesAsPassenger] = useState<
    object[] | undefined
  >([]);
  const [myRidesAsDriver, setMyRidesAsDriver] = useState<object[] | undefined>(
    []
  );
  const [
    fetchData,
    updateData,
    setData,
    getUserRidesAsPassenger,
    getUserRidesAsDriver,
  ] = useFetch();
  const [route, setRoute] = useState<Route | null>(null);
  const [requestRoute, setRequestRoute] = useState<Route | null>(null);
  const [viewRides, setViewRides] = useState<boolean>(false);
  const [rides, setRides] = useState<Route[] | any[]>([]);
  const [visible, setVisible] = useState(true);
  const [routeFlag, setRouteFlag] = useState<number>(0);
  const [requestFlag, setRequestFlag] = useState<number>(0);
  const [returnFlag, setReturnFlag] = useState(false);
  const [params, setParams] = useState(routeProp?.params?.route);
  const [
    getValue,
    setValue,
    removeValue,
    setRidesAsDriver,
    setRidesAsPassenger,
    getRidesAsDriver,
    getRidesAsPassenger,
  ] = useAsyncStorage();
  const requestRideHandler = () => {
    setTransform({
      returnButton: true,
      closeButton: false,
    });
  };

  const onDismiss = () => {
    setRoute(null);
    setRequestRoute(null);
  };

  const onReturn = () => {
    setRequestVisible(true);
  };

  useEffect(() => {
    setRouteFlag(0);
    setRequestFlag(0);
  }, []);

  useEffect(() => {
    if (routeFlag !== 0) {
      setTransform({
        ...transform,
        closeButton: !transform.closeButton,
      });
      setVisible(!visible);
    }
    setRouteFlag(1);
  }, [route]);

  useEffect(() => {
    if (!route) {
      if (requestFlag !== 0) {
        setTransform({
          ...transform,
          closeButton: !transform.closeButton,
        });
        setVisible(!visible);
      }
      setRequestFlag(1);
    }
  }, [requestRoute]);

  useEffect(() => {
    if (requestFlag !== 0) {
      setTransform({
        ...transform,
        returnButton: !transform.returnButton,
      });
      setVisible(!visible);
    }
    setRequestFlag(1);
  }, [returnFlag]);

  useEffect(() => {
    getUserRides();
  }, []);

  const getUserRides = async () => {
    const user = await getValue();
    console.log("user id " + user.id + "\n");
    const rad = await getUserRidesAsDriver(user.id);
    const rap = await getUserRidesAsDriver(user.id);
    if (rad !== undefined && rap !== undefined) {
      console.log(JSON.stringify(rad));
      console.log(JSON.stringify(rap));
      setRidesAsPassenger(rap);
      setRidesAsDriver(rad);
    }
  };

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      <RequestRouteContext.Provider value={{ requestRoute, setRequestRoute }}>
        <CurrentRidesContext.Provider value={{ viewRides, setViewRides }}>
          <SafeAreaView style={styles.container}>
            <Map
              setReturn={() => {
                setReturnFlag(true);
              }}
            />
            <MenuButton
              onDismiss={onDismiss}
              returnButton={transform.returnButton}
              closeButton={transform.closeButton}
              navigation={navigation}
            />

            <FabButton
              visible={visible}
              onGive={() => {
                setGiveVisible(true);
              }}
              onRequest={() => {
                setRequestVisible(true);
                // requestRideHandler();
              }}
            />
            <GiveRidePopUp
              giveVisible={giveVisible}
              onDismiss={() => {
                setGiveVisible(false);
              }}
            />
            <RequestRidePopUp
              requestVisible={requestVisible}
              onDismiss={() => {
                setRequestVisible(false);
              }}
            />
            {/* <AvailableRidesPopUp onDismiss={() => {}} visible={ridesVisible} /> */}
          </SafeAreaView>
        </CurrentRidesContext.Provider>
      </RequestRouteContext.Provider>
    </RouteContext.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  bottomButtons: {
    flex: 1,
    zIndex: 10,
  },
});
