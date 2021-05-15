import AsyncStorage from "@react-native-community/async-storage";

export const useAsyncStorage = () => {
  const getValue = async (key?: string) => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null && value !== "undefined") {
        const user = JSON.parse(value);
        return key !== undefined ? user[key] : user;
      }
      console.log("NULL")
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

  return [getValue, setValue, removeValue] as const;
};
