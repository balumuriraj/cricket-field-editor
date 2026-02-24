import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Over {
  number: number;
  balls: Array<{
    runs: number;
    extras: number;
    extrasType?: "wide" | "noBall" | "bye" | "legBye";
    isWicket: boolean;
    batsmanId?: string;
    bowlerId?: string;
  }>;
}

export interface ScoreCardState {
  currentInnings: 1 | 2;
  battingTeamId: string;
  bowlingTeamId: string;
  overs: Over[];
  totalRuns: number;
  wickets: number;
  extras: number;
  targetRuns?: number;
  currentOver: number;
  currentBall: number;
  currentBatsmen: [string | null, string | null];
  currentBowler: string | null;

  // Actions
  switchInnings: () => void;
  addBall: (ballDetails: Over["balls"][0]) => void;
  setCurrentBatsmen: (batsmen: [string | null, string | null]) => void;
  setCurrentBowler: (bowlerId: string | null) => void;
  setTarget: (runs: number) => void;
  resetScoreCard: () => void;
}

const createScoreCardStore = (matchId: string) => {
  return create<ScoreCardState>()(
    persist(
      (set) => ({
        currentInnings: 1,
        battingTeamId: "",
        bowlingTeamId: "",
        overs: [],
        totalRuns: 0,
        wickets: 0,
        extras: 0,
        currentOver: 0,
        currentBall: 0,
        currentBatsmen: [null, null],
        currentBowler: null,

        switchInnings: () =>
          set((state) => {
            if (state.currentInnings === 1) {
              return {
                currentInnings: 2,
                battingTeamId: state.bowlingTeamId,
                bowlingTeamId: state.battingTeamId,
                targetRuns: state.totalRuns + 1,
                overs: [],
                totalRuns: 0,
                wickets: 0,
                extras: 0,
                currentOver: 0,
                currentBall: 0,
                currentBatsmen: [null, null],
                currentBowler: null,
              };
            }
            return state;
          }),

        addBall: (ballDetails) =>
          set((state) => {
            const currentOverIndex = state.overs.findIndex(
              (over) => over.number === state.currentOver
            );
            const newOvers = [...state.overs];
            let newCurrentBall = state.currentBall;
            let newCurrentOver = state.currentOver;

            // If this is a new over
            if (currentOverIndex === -1) {
              newOvers.push({
                number: state.currentOver,
                balls: [ballDetails],
              });
              newCurrentBall = 1;
            } else {
              // Add ball to existing over
              newOvers[currentOverIndex].balls.push(ballDetails);
              newCurrentBall = state.currentBall + 1;

              // If we've completed an over (6 legal deliveries)
              const legalDeliveries = newOvers[currentOverIndex].balls.filter(
                (ball) =>
                  !ball.extrasType ||
                  (ball.extrasType !== "wide" && ball.extrasType !== "noBall")
              ).length;

              if (legalDeliveries >= 6) {
                newCurrentOver = state.currentOver + 1;
                newCurrentBall = 0;
              }
            }

            const newTotalRuns =
              state.totalRuns + ballDetails.runs + ballDetails.extras;
            const newWickets = ballDetails.isWicket
              ? state.wickets + 1
              : state.wickets;
            const newExtras = state.extras + ballDetails.extras;

            return {
              overs: newOvers,
              totalRuns: newTotalRuns,
              wickets: newWickets,
              extras: newExtras,
              currentOver: newCurrentOver,
              currentBall: newCurrentBall,
            };
          }),

        setCurrentBatsmen: (batsmen) => set({ currentBatsmen: batsmen }),

        setCurrentBowler: (bowlerId) => set({ currentBowler: bowlerId }),

        setTarget: (runs) => set({ targetRuns: runs }),

        resetScoreCard: () =>
          set({
            currentInnings: 1,
            overs: [],
            totalRuns: 0,
            wickets: 0,
            extras: 0,
            targetRuns: undefined,
            currentOver: 0,
            currentBall: 0,
            currentBatsmen: [null, null],
            currentBowler: null,
          }),
      }),
      {
        name: `cricket-scorecard-${matchId}`,
        storage: createJSONStorage(() =>
          typeof window !== "undefined" ? localStorage : sessionStorage
        ),
      }
    )
  );
};

export default createScoreCardStore;
export type ScoreCardStore = ReturnType<typeof createScoreCardStore>;
