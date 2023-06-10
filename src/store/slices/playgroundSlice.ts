import { StateCreator } from 'zustand';

export interface PlaygroundSlice {
  points: number;
  addPoint: () => void;
}

export const createPlaygroundSlice: StateCreator<PlaygroundSlice, [], [], PlaygroundSlice> = set => ({
  points: 0,
  addPoint: () => set(state => ({ points: state.points + 1 })),
});
