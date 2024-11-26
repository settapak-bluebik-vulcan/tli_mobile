/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

const secureStorage = {
  getItem: async (key: string) => {
    try {
      const value = await RNSecureStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  },
  setItem: async <T>(key: string, value: T) => {
    try {
      await RNSecureStorage.setItem(key, JSON.stringify(value), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Fail to set item in secure storage');
    }
  },

  removeItem: async (key: string) => {
    try {
      await RNSecureStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from secure storage:', error);
    }
  },
};

export default secureStorage;
