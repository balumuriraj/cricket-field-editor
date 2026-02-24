import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the player type with cricket-specific attributes
interface Player {
  id: string;
  name: string;
  role: string;
  battingStats: {
    runs: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    isOut: boolean;
    outMethod?: string;
  };
  bowlingStats: {
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
  };
}

// Define the team state and actions
export interface TeamState {
  players: Player[];
  teamName: string;
  captain: string | null;
  addPlayer: (player: Omit<Player, "battingStats" | "bowlingStats">) => void;
  removePlayer: (id: string) => void;
  updateTeamName: (name: string) => void;
  setCaptain: (playerId: string | null) => void;
  // Cricket-specific actions
  updateBattingStats: (
    playerId: string,
    stats: Partial<Player["battingStats"]>
  ) => void;
  updateBowlingStats: (
    playerId: string,
    stats: Partial<Player["bowlingStats"]>
  ) => void;
  reset: () => void;
}

// Create a factory function that returns a new team store instance
const createTeamStore = (id: string, initialTeamName: string = "") => {
  return create<TeamState>()(
    persist(
      (set) => ({
        players: [],
        teamName: initialTeamName,
        captain: null,

        addPlayer: (playerInfo) =>
          set((state) => ({
            players: [
              ...state.players,
              {
                ...playerInfo,
                battingStats: {
                  runs: 0,
                  ballsFaced: 0,
                  fours: 0,
                  sixes: 0,
                  isOut: false,
                },
                bowlingStats: {
                  overs: 0,
                  maidens: 0,
                  runs: 0,
                  wickets: 0,
                },
              },
            ],
          })),

        removePlayer: (id) =>
          set((state) => ({
            players: state.players.filter((player) => player.id !== id),
            captain: state.captain === id ? null : state.captain,
          })),

        updateTeamName: (name) => set({ teamName: name }),

        setCaptain: (playerId) => set({ captain: playerId }),

        updateBattingStats: (playerId, stats) =>
          set((state) => ({
            players: state.players.map((player) =>
              player.id === playerId
                ? {
                    ...player,
                    battingStats: { ...player.battingStats, ...stats },
                  }
                : player
            ),
          })),

        updateBowlingStats: (playerId, stats) =>
          set((state) => ({
            players: state.players.map((player) =>
              player.id === playerId
                ? {
                    ...player,
                    bowlingStats: { ...player.bowlingStats, ...stats },
                  }
                : player
            ),
          })),

        reset: () =>
          set({
            players: [],
            teamName: initialTeamName,
            captain: null,
          }),
      }),
      {
        name: `cricket-team-${id}`,
        storage: createJSONStorage(() =>
          typeof window !== "undefined" ? localStorage : sessionStorage
        ),
      }
    )
  );
};

export default createTeamStore;
export type TeamStore = ReturnType<typeof createTeamStore>;
