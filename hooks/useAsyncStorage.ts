import AsyncStorage from "@react-native-community/async-storage";
import { Vehicle } from "../types";

export const useAsyncStorage = () => {
  const getValue = async (key?: string) => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null && value !== "undefined") {
        const user = JSON.parse(value);
        return key !== undefined ? user[key] : user;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  //@ts-ignore
  const setValue = async (value: object | DocumentData | undefined) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  const setVehicle = async(vehicle:Vehicle)=>{
    try {
      
    } catch (error) {
      
    }
  };
  //@ts-ignore
  const setRidesAsDriver = async (value: object[] | DocumentData[] | undefined[]) => {
    try {
      await AsyncStorage.setItem("ridesAsDriver", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  //@ts-ignore
  const setRidesAsPassenger = async (value: object[] | DocumentData[] | undefined[]) => {
    try {
      await AsyncStorage.setItem("ridesAsPassenger", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  //@ts-ignore
  const getRidesAsDriver = async () => {
    try {
      var rides: object[] | undefined = [];
      const aux = await AsyncStorage.getItem("ridesAsDriver");
      if (aux !== null) {
        rides = JSON.parse(aux);
        return rides;
      }else{
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRidesAsPassenger = async () => {
    try {
      var rides: object[] | undefined = [];
      const aux = await AsyncStorage.getItem("ridesAsPassenger");
      if (aux !== null) {
        rides = JSON.parse(aux);
        return rides;
      }else{
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [getValue, setValue, removeValue, setRidesAsDriver, setRidesAsPassenger,getRidesAsDriver,getRidesAsPassenger] as const;
};
