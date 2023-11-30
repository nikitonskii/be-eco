import { StateCreator } from 'zustand';

// type TopPlayersPayload = {
//   collection: string;
//   filter: string;
//   limit: number;
// };
export interface ProfileSlice {
  // getTopPlayers: (params: TopPlayersPayload) => void;
  // topPlayersList: any[];
  // userNickname: string;
  // setUserNickname: (name: string) => void;
}

export const createProfileSlice: StateCreator<ProfileSlice, [], [], ProfileSlice> = set => ({
  // total: 0,
  // userNickname: '',
  // setUserNickname: name => set({ userNickname: name }),
  // topPlayersList: [],
  // getTopPlayers: async params => {},
});
