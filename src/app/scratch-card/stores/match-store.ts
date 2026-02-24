import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import createTeamStore, { TeamState, TeamStore } from "./team-store";
import createScoreCardStore, {
  ScoreCardState,
  ScoreCardStore,
} from "./scorecard-store";

type MatchFormat = "T20" | "ODI" | "Test";
type MatchStatus = "upcoming" | "inProgress" | "completed";

interface MatchState {
  id: string;
  venue: string;
  format: MatchFormat;
  date: string;
  status: MatchStatus;
  tossWinner: string | null;
  tossChoice: "bat" | "bowl" | null;
  maxOvers: number;
  winner: string | null;

  // Actions
  updateMatchDetails: (details: Partial<Omit<MatchState, "id">>) => void;
  setToss: (winner: string, choice: "bat" | "bowl") => void;
  startMatch: () => void;
  endMatch: (winner: string | null) => void;
  resetMatch: () => void;

  // Store references
  homeTeam: TeamState;
  awayTeam: TeamState;
  scoreCard: ScoreCardState;

  // Actual store references (not just state)
  getHomeTeamStore: () => TeamStore;
  getAwayTeamStore: () => TeamStore;
  getScoreCardStore: () => ScoreCardStore;
}

// Factory function to create a cricket match store
const createMatchStore = (matchId: string) => {
  // Create the team and scorecard stores
  const homeTeamStore = createTeamStore(`${matchId}-home`, "Home Team");
  const awayTeamStore = createTeamStore(`${matchId}-away`, "Away Team");
  const scoreCardStore = createScoreCardStore(matchId);

  return create<MatchState>()(
    persist(
      (set) => ({
        id: matchId,
        venue: "",
        format: "T20",
        date: new Date().toISOString().split("T")[0],
        status: "upcoming",
        tossWinner: null,
        tossChoice: null,
        maxOvers: 20,
        winner: null,

        updateMatchDetails: (details) =>
          set((state) => ({ ...state, ...details })),

        setToss: (winner, choice) =>
          set((state) => {
            const batting =
              choice === "bat"
                ? winner
                : winner === state.homeTeam.teamName
                ? state.awayTeam.teamName
                : state.homeTeam.teamName;
            const bowling =
              choice === "bowl"
                ? winner
                : winner === state.homeTeam.teamName
                ? state.awayTeam.teamName
                : state.homeTeam.teamName;

            // Update scorecard with batting and bowling teams
            scoreCardStore.setState({
              battingTeamId:
                batting === state.homeTeam.teamName
                  ? `${matchId}-home`
                  : `${matchId}-away`,
              bowlingTeamId:
                bowling === state.homeTeam.teamName
                  ? `${matchId}-home`
                  : `${matchId}-away`,
            });

            return {
              tossWinner: winner,
              tossChoice: choice,
            };
          }),

        startMatch: () => set({ status: "inProgress" }),

        endMatch: (winner) => set({ status: "completed", winner }),

        resetMatch: () => {
          set({
            venue: "",
            format: "T20",
            date: new Date().toISOString().split("T")[0],
            status: "upcoming",
            tossWinner: null,
            tossChoice: null,
            maxOvers: 20,
            winner: null,
          });

          // Reset team stores and scorecard
          homeTeamStore.getState().reset();
          awayTeamStore.getState().reset();
          scoreCardStore.getState().resetScoreCard();
        },

        // Expose the current state
        homeTeam: homeTeamStore.getState(),
        awayTeam: awayTeamStore.getState(),
        scoreCard: scoreCardStore.getState(),

        // Provide getters for the actual store instances
        getHomeTeamStore: () => homeTeamStore,
        getAwayTeamStore: () => awayTeamStore,
        getScoreCardStore: () => scoreCardStore,
      }),
      {
        name: `cricket-match-${matchId}`,
        storage: createJSONStorage(() =>
          typeof window !== "undefined" ? localStorage : sessionStorage
        ),
        // Don't try to serialize the store methods
        partialize: (state) => ({
          id: state.id,
          venue: state.venue,
          format: state.format,
          date: state.date,
          status: state.status,
          tossWinner: state.tossWinner,
          tossChoice: state.tossChoice,
          maxOvers: state.maxOvers,
          winner: state.winner,
        }),
      }
    )
  );
};

// Export the factory function and also a default match instance
export default createMatchStore;
export type MatchStore = ReturnType<typeof createMatchStore>;

// Create a default match store for convenience
export const useMatchStore = createMatchStore("current-match");
