import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInStorage = async (key: string, value: any) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getStorageData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      return parseString(value);
    }

    return null;
  } catch (e) {
    // error reading value
  }
};

const parseString = (str: string) => {
  try {
    const json = JSON.parse(str);
    return json;
  } catch (e) {
    return str;
  }
};
