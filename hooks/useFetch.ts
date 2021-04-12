import firebase from "firebase/app";
import "firebase/firestore";

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
      const newData = await firebase.firestore().collection("users").doc(uid).update(value);
      return newData;
    } catch (error) {
      return error;
    }
  };

  const setData = async(uid: string, value: object) => {
    console.log("VALUE" + JSON.stringify(value))
    try {
      await firebase.firestore().collection("users").doc(uid).set(value);
      return;
    } catch (error) {
      return error;
    }
  };

  return [fetchData, updateData, setData] as const;
};
