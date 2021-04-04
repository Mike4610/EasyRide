import AsyncStorage from "@react-native-community/async-storage";

export const useAsyncStorage = () => {

  const getValue = async (key?: string) => {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      const user = JSON.parse(value);
      return key !== undefined ? user[key] : user;
    }
  };

  //@ts-ignore
  const setValue = async (value: object | DocumentData | undefined) => {
    await AsyncStorage.setItem("user", JSON.stringify(value));
  };

  const removeValue = async () => {
    await AsyncStorage.removeItem("user");
  };

  return [getValue, setValue, removeValue] as const;
};
