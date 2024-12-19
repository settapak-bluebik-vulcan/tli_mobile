/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
import { StorageKey } from '@constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Failed to get item from AsyncStorage:', error);
      return null;
    }
  },
  setItem: async <T>(key: string, value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to set item in AsyncStorage:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from AsyncStorage:', error);
    }
  },
  multiGet: async (storageKey: string[]) => {
    try {
      const values = await AsyncStorage.multiGet(storageKey);
      return values
        ? values.map(([key, value]) => ({
            key,
            value: value ? JSON.parse(value) : null,
          }))
        : null;
    } catch (error) {
      console.error('Failed to get multi-item from AsyncStorage:', error);
    }
  },
  multiSet: async <T>(storageValues: [string | StorageKey, T][]) => {
    try {
      const values: [string, string][] = storageValues.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);

      await AsyncStorage.multiSet(values);
    } catch (error) {
      console.error('Failed to set multi-item from AsyncStorage:', error);
    }
  },
};

export default asyncStorage;
