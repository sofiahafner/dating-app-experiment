import React, { useState } from "react";

export function PlayerForm({ onPlayerID, connecting }) {
  const [playerID, setPlayerID] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!playerID || playerID.trim() === "") {
      return;
    }

    onPlayerID(playerID);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3 p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          Enter your Player Identifier
        </h3>
        <p className="mt-2 text-base text-gray-600">
          If you are a Prolific participant, please enter your Prolific ID to ensure you are paid. If not, you can use any non-identifiable player name.
        </p>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <fieldset disabled={connecting}>
            <div className="mt-4">
              <label
                htmlFor="playerID"
                className="block text-sm font-medium text-gray-700"
              >
                Identifier
              </label>
              <input
                id="playerID"
                name="playerID"
                type="text"
                autoComplete="off"
                required
                autoFocus
                value={playerID}
                onChange={(e) => setPlayerID(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 rounded text-white font-bold bg-blue-500 hover:bg-blue-700"
              >
                Enter
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
