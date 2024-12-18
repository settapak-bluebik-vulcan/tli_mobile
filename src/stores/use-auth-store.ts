/* eslint-disable @typescript-eslint/ban-types */
import { AuthModel } from 'src/models/auth/auth.model';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import secureStorage from '../utils/secure-storage';

const initialState: AuthModel = {
  accessToken: null,
  refreshToken: null,
};

const authStore = (set: Function, get: Function) => ({
  ...initialState,
  getTokens: () => {
    const value: AuthModel = get();
    return value;
  },
  setTokens: (value: AuthModel) => {
    set(value);
  },
  setAccessToken: (values: string) => {
    set({ ...get(), accessToken: values });
  },
  removeTokens: () => {
    set(initialState);
  },
});

export const useAuthStore = create(
  persist(authStore, { name: 'authStore', storage: secureStorage })
);
