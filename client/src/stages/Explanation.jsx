import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';

export function Explanation() {
    const player = usePlayer();
    console.log("Explanation");

    const handleClick = () => {
        player.stage.set("submit", true);
    };

    return (
        <div className="flex justify-center mt+10">
            <div className="w-1/2 p-10 bg-white shadow-lg rounded-lg">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Instructions<br /><br />
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                In this experiment, you will play a character on a dating app.
                <br /><br />
                1. <strong>Character Selection</strong>: First, you will choose which character you want to play.
                <br /><br />
                2. <strong>Matching Rounds</strong>: You will then go through multiple rounds where you will be presented with pairs of characters, played by other participants. For each pair, select the character you prefer to match with.
                <br /><br />
                3. <strong>Recommendation System</strong>: A recommendation system will learn your preferences based on your selections.
                <br /><br />
                4. <strong>Feedback</strong>: At the end of the experiment, you will be asked to provide your opinions on the recommendation system.<br /><br />
            </p>
                <button 
                    onClick={handleClick} 
                    autoFocus 
                    className="px-4 py-2 rounded text-white font-bold bg-blue-500 hover:bg-blue-700"
                >
                    I understand
                </button>
            </div>
        </div>
    );
}
