import firebase from "firebase/app";
import "firebase/firestore";
import { Ride, User } from "../types";

export const useFetch = () => {
  const fetchData = async (uid: string) => {
    try {
      const response = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      return response.data();
    } catch (error) {
      return error;
    }
  };

  const updateData = async (uid: string, value: object) => {
    try {
      await firebase.firestore().collection("users").doc(uid).update(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const setData = async (uid: string, value: User) => {
    try {
      await firebase.firestore().collection("users").doc(uid).set(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getUserRidesAsPassenger = async (uid:string) => {
    const rides:Ride|any = [];
    try{
     var response =  await firebase.firestore().collection("rides").where("passengersId","array-contains",uid).get();
     response.docs.forEach(doc =>{
      rides.push(doc.data());
     });
     return rides;
    }catch(error){
        console.log(error);
        return null;
    }
  };

  const getUserRidesAsDriver = async (uid:string) => {
    const rides:Ride|any = [];
    try{
     var response =  await firebase.firestore().collection("rides").where("driverId","==",uid).get();
     response.docs.forEach(doc =>{
      rides.push(doc.data());
     });
     return rides;
    }catch(error){
        console.log(error);
        return null;
    }
  };

  return [fetchData, updateData, setData, getUserRidesAsPassenger,getUserRidesAsDriver] as const;
};
