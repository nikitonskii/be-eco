import { StateCreator } from 'zustand';

type TimeRange = {
  start: Date;
  end: Date;
};

export interface PlaygroundSlice {
  points: number;
  addPoint: (pointsAmount: number) => void;
  subtractPoint: (pointsAmount: number) => void;
  usedOptions: number[];
  addUsedOption: (option: number) => void;
  clearUsedOptions: () => void;
  total: number;
  timeRange: TimeRange;
  setTimeRange: (time: any) => void;
  resetPoints: () => void;
  setTotal: (amount: number) => void;
}

export const createPlaygroundSlice: StateCreator<PlaygroundSlice, [], [], PlaygroundSlice> = set => ({
  points: 0,
  addPoint: pointsAmount => set(state => ({ points: state.points + pointsAmount })),
  subtractPoint: pointsAmount => set(state => ({ points: state.points - pointsAmount })),
  usedOptions: [],
  addUsedOption: (option: number) => set(state => ({ usedOptions: [...state.usedOptions, option] })),
  clearUsedOptions: () => set({ usedOptions: [] }),
  total: 0,
  timeRange: {
    start: new Date(),
    end: new Date(),
  },
  setTimeRange: (time: any) => set(state => ({ timeRange: { ...state.timeRange, ...time } })),
  resetPoints: () => set({ points: 0 }),
  setTotal: amount => set({ total: amount }),
});
