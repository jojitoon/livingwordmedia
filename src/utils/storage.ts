import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const storeDataInStorage = async (key: StorageKeys, value: any) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    storage.set(key, value);
  } catch (e) {
    // saving error
  }
};

export const getStorageData = (key: StorageKeys) => {
  try {
    const value = storage.getString(key);
    if (value) {
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

export enum StorageKeys {
  FAVOURITES = 'favourites',
  RECENTLY_PLAYED = 'recentlyPlayed',
  PLAYLISTS = 'playlists',
  PLAYLISTS_ORDER = 'playlistsOrder',
  LOCAL = 'local',
  SETTINGS = 'settings',
}
