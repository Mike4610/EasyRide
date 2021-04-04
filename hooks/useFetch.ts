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

  const changeData = (uid: string, value: object) => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update(value);
      return;
    } catch (error) {
      return error;
    }
  };

  return [fetchData, changeData] as const;
};
