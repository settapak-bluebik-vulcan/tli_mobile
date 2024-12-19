/* eslint-disable @typescript-eslint/ban-types */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fitbitAuthStore } from '@tli-up-packages/stores';
import secureStorage from '../utils/secure-storage';

export const useFitbitAuthStore = create(
  persist(fitbitAuthStore, { name: 'fitbitAuthStore', storage: secureStorage })
);
