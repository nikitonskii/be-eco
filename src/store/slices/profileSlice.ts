import { StateCreator } from 'zustand';

export interface ProfileSlice {
  likes: number;
  addLike: () => void;
}

export const createProfileSlice: StateCreator<ProfileSlice, [], [], ProfileSlice> = set => ({
  likes: 0,
  addLike: () => set(state => ({ likes: state.likes + 1 })),
});
