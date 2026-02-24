"use client";

import { useEffect, useState } from "react";
import { useMatchStore } from "../stores/match-store";
import { v4 as uuidv4 } from "uuid";

export default function Match() {
  // Get the match store
  const match = useMatchStore();
  const matchStore = useMatchStore;

  // Use the store accessor functions to get the actual store instances
  const homeTeamStore = match.getHomeTeamStore();
  const awayTeamStore = match.getAwayTeamStore();
  const scoreCardStore = match.getScoreCardStore();

  // Set up state to track the current state of each store
  const [homeTeam, setHomeTeam] = useState(homeTeamStore.getState());
  const [awayTeam, setAwayTeam] = useState(awayTeamStore.getState());
  const [scoreCard, setScoreCard] = useState(scoreCardStore.getState());
  const [matchState, setMatchState] = useState(matchStore.getState());

  // Set up listeners to update our local state when the stores change
  useEffect(() => {
    // Subscribe to all stores - note that we're using the actual store instances now
    const unsubHomeTeam = homeTeamStore.subscribe(setHomeTeam);
    const unsubAwayTeam = awayTeamStore.subscribe(setAwayTeam);
    const unsubScoreCard = scoreCardStore.subscribe(setScoreCard);
    const unsubMatch = matchStore.subscribe(setMatchState);

    return () => {
      unsubHomeTeam();
      unsubAwayTeam();
      unsubScoreCard();
      unsubMatch();
    };
  }, [homeTeamStore, awayTeamStore, scoreCardStore, matchStore]);

  // Add a player to home team
  const addHomePlayer = () => {
    const newPlayer = {
      id: uuidv4(),
      name: `Player ${homeTeam.players.length + 1}`,
      role: "Batsman",
    };
    homeTeamStore.getState().addPlayer(newPlayer);
  };

  // Add a player to away team
  const addAwayPlayer = () => {
    const newPlayer = {
      id: uuidv4(),
      name: `Player ${awayTeam.players.length + 1}`,
      role: "Bowler",
    };
    awayTeamStore.getState().addPlayer(newPlayer);
  };

  // Update match details
  const updateMatchVenue = (venue: string) => {
    matchStore.getState().updateMatchDetails({ venue });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cricket Match Management</h1>

      {/* Match Details */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Match Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Venue:</label>
            <input
              type="text"
              value={matchState.venue}
              onChange={(e) => updateMatchVenue(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Format:</label>
            <select
              value={matchState.format}
              onChange={(e) =>
                matchStore
                  .getState()
                  .updateMatchDetails({ format: e.target.value as any })
              }
              className="border p-2 w-full rounded"
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Date:</label>
            <input
              type="date"
              value={matchState.date}
              onChange={(e) =>
                matchStore
                  .getState()
                  .updateMatchDetails({ date: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Status:</label>
            <div className="text-lg font-medium">
              {matchState.status === "upcoming" && (
                <span className="text-blue-500">Upcoming</span>
              )}
              {matchState.status === "inProgress" && (
                <span className="text-green-500">In Progress</span>
              )}
              {matchState.status === "completed" && (
                <span className="text-gray-500">Completed</span>
              )}
            </div>
          </div>
        </div>

        {/* Match actions */}
        <div className="mt-4 flex gap-2">
          {matchState.status === "upcoming" && (
            <button
              onClick={() => matchStore.getState().startMatch()}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Start Match
            </button>
          )}

          {matchState.status === "inProgress" && (
            <button
              onClick={() => matchStore.getState().endMatch(homeTeam.teamName)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              End Match
            </button>
          )}

          <button
            onClick={() => matchStore.getState().resetMatch()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset Match
          </button>
        </div>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Home Team */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Home Team</h2>
          <div className="mb-4">
            <label className="block mb-1">Team Name:</label>
            <input
              type="text"
              value={homeTeam.teamName}
              onChange={(e) =>
                homeTeamStore.getState().updateTeamName(e.target.value)
              }
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            onClick={addHomePlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Player
          </button>

          <div>
            <h3 className="font-semibold mb-2">Players:</h3>
            <ul className="space-y-2">
              {homeTeam.players.map((player) => (
                <li
                  key={player.id}
                  className="border p-2 rounded flex justify-between"
                >
                  <span>
                    {player.name} - {player.role}
                  </span>
                  <button
                    onClick={() =>
                      homeTeamStore.getState().removePlayer(player.id)
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {homeTeam.players.length === 0 && (
              <p className="text-gray-500 italic">No players yet</p>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Away Team</h2>
          <div className="mb-4">
            <label className="block mb-1">Team Name:</label>
            <input
              type="text"
              value={awayTeam.teamName}
              onChange={(e) =>
                awayTeamStore.getState().updateTeamName(e.target.value)
              }
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            onClick={addAwayPlayer}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Player
          </button>

          <div>
            <h3 className="font-semibold mb-2">Players:</h3>
            <ul className="space-y-2">
              {awayTeam.players.map((player) => (
                <li
                  key={player.id}
                  className="border p-2 rounded flex justify-between"
                >
                  <span>
                    {player.name} - {player.role}
                  </span>
                  <button
                    onClick={() =>
                      awayTeamStore.getState().removePlayer(player.id)
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {awayTeam.players.length === 0 && (
              <p className="text-gray-500 italic">No players yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Scorecard */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Scorecard</h2>

        {matchState.status === "inProgress" && (
          <div>
            <div className="mb-4">
              <h3 className="font-bold">
                {scoreCard.battingTeamId === `${matchState.id}-home`
                  ? homeTeam.teamName
                  : awayTeam.teamName}
                <span className="ml-2 font-normal">
                  {scoreCard.totalRuns}/{scoreCard.wickets}
                </span>
                <span className="ml-2 text-gray-500">
                  ({Math.floor(scoreCard.currentOver)}.{scoreCard.currentBall}{" "}
                  overs)
                </span>
              </h3>

              {scoreCard.targetRuns && (
                <p className="text-gray-700">
                  Target: {scoreCard.targetRuns} runs
                </p>
              )}
            </div>

            {/* Simple ball entry form - could be expanded */}
            <div className="mt-4 p-2 border rounded bg-gray-50">
              <h4 className="font-medium mb-2">Add Ball</h4>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 0,
                      extras: 0,
                      isWicket: false,
                    })
                  }
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  0
                </button>
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 1,
                      extras: 0,
                      isWicket: false,
                    })
                  }
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  1
                </button>
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 4,
                      extras: 0,
                      isWicket: false,
                    })
                  }
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  4
                </button>
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 6,
                      extras: 0,
                      isWicket: false,
                    })
                  }
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  6
                </button>
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 0,
                      extras: 1,
                      extrasType: "wide",
                      isWicket: false,
                    })
                  }
                  className="bg-yellow-200 px-3 py-1 rounded"
                >
                  Wide
                </button>
                <button
                  onClick={() =>
                    scoreCardStore.getState().addBall({
                      runs: 0,
                      extras: 0,
                      isWicket: true,
                    })
                  }
                  className="bg-red-200 px-3 py-1 rounded"
                >
                  Wicket
                </button>
              </div>
            </div>

            {/* Innings switcher */}
            {scoreCard.currentInnings === 1 && (
              <button
                onClick={() => scoreCardStore.getState().switchInnings()}
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
              >
                End Innings
              </button>
            )}
          </div>
        )}

        {matchState.status !== "inProgress" && (
          <p className="text-gray-500 italic">
            {matchState.status === "upcoming"
              ? "Match has not started yet"
              : "Match has ended"}
          </p>
        )}
      </div>
    </div>
  );
}
