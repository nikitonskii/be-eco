import { create } from 'zustand';
import { StateStorage, persist, createJSONStorage, devtools } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

import { createProfileSlice, ProfileSlice } from './slices/profileSlice';
import { createPlaygroundSlice, PlaygroundSlice } from './slices/playgroundSlice';

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);

    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const useBoundStore = create<ProfileSlice & PlaygroundSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createProfileSlice(...a),
        ...createPlaygroundSlice(...a),
      }),
      {
        name: 'global', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
        partialize: state => {
          return {
            ...state,
            usedOptions: [],
            points: 0,
          };
        },
      },
    ),
    {
      enabled: __DEV__,
    },
  ),
);

storage.clearAll();
