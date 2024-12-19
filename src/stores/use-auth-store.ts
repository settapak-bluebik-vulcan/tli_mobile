import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authStore } from '@tli-up-packages/stores/auth-store';
import secureStorage from '../utils/secure-storage';

export const useAuthStore = create(
  persist(authStore, { name: 'authStore', storage: secureStorage })
);
