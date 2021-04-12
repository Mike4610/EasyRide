import firebase from "firebase/app";
import "firebase/firestore";
import { User } from "../types";

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

  return [fetchData, updateData, setData] as const;
};
