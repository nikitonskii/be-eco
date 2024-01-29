import { AvatarCodes } from '@/types';
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
  userNickname: string;
  setUserNickname: (name: string) => void;
  userBestScore: number;
  setUserBestScore: (score: number) => void;
  userAvatar: AvatarCodes | undefined;
  setUserAvatar: (avatarCode: AvatarCodes | undefined) => void;
}

export const createPlaygroundSlice: StateCreator<PlaygroundSlice, [], [], PlaygroundSlice> = set => ({
  points: 0,
  addPoint: pointsAmount => set(state => ({ points: state.points + pointsAmount })),
  subtractPoint: pointsAmount => set(state => ({ points: state.points - pointsAmount })),
  usedOptions: [],
  addUsedOption: (option: number) => set(state => ({ usedOptions: [...state.usedOptions, option] })),
  clearUsedOptions: () => set({ usedOptions: [] }),
  timeRange: {
    start: new Date(),
    end: new Date(),
  },
  setTimeRange: (time: any) => set(state => ({ timeRange: { ...state.timeRange, ...time } })),
  resetPoints: () => set({ points: 0 }),
  //TODO: move to profile slice
  setTotal: amount => set({ total: amount }),
  total: 0,
  userNickname: '',
  setUserNickname: name => set({ userNickname: name }),
  userBestScore: 0,
  setUserBestScore: score => set({ userBestScore: score }),
  userAvatar: undefined,
  setUserAvatar: avatarCode => set({ userAvatar: avatarCode }),
});
