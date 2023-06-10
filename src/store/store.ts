import { create } from 'zustand';
import { createProfileSlice, ProfileSlice } from './slices/profileSlice';
import { createPlaygroundSlice, PlaygroundSlice } from './slices/playgroundSlice';

export const useBoundStore = create<ProfileSlice & PlaygroundSlice>()((...a) => ({
  ...createProfileSlice(...a),
  ...createPlaygroundSlice(...a),
}));
