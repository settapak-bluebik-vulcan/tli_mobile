import { AuthModel } from 'src/models/auth/auth.model';
import secureStorage from '../utils/secure-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FitbitAuthModel } from 'src/models/auth/fitbit-auth.model';

const initialState: FitbitAuthModel = {
  fitbitAccessToken: null,
  fitbitRefreshToken: null,
};

const authStore = (set: Function, get: Function) => ({
  ...initialState,
  getTokens: () => {
    const value: FitbitAuthModel = get();
    return value;
  },
  setTokens: (value: FitbitAuthModel) => {
    set(value);
  },

  removeTokens: () => {
    set(initialState);
  },
});

export const fitbitAuthStore = create(
  persist(authStore, { name: 'fitbitAuthStore', storage: secureStorage })
);
