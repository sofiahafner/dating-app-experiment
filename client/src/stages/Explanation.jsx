import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';

export function Explanation() {
    const player = usePlayer();

    const handleClick = () => {
        player.stage.set("submit", true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen-50">
            <div className="w-1/2 p-10 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Instructions
                </h3>
                {/* <hr className="my-4" /> */}
                <p className="mt-1 text-base text-gray-600">
                    In this experiment, you will play a character who is using a dating app to find their match. 
                </p>
                <hr className="my-4" />
                <p className="mt-1 text-base text-gray-600">
                    1. <strong>Character Selection</strong>: First, you will choose a character to play.
                </p>
                <hr className="my-4" />
                <p className="mt-1 text-base text-gray-600">
                    2. <strong>Matching</strong>: Then, you can decide which characters played by other participants you want to match with.
                </p>
                <hr className="my-4" />
                <p className="mt-1 text-base text-gray-600">
                    3. <strong>Recommendation System</strong>: Based on your likes, an algorithm will try to learn your preferences and show you better recommendations.
                </p>
                <hr className="my-4" />
                <p className="mt-1 text-base text-gray-600">
                    4. <strong>Feedback</strong>: Throughout the experiment, you will be asked to provide your opinions on the recommendations you are given.
                </p>
                <hr className="my-4" />
                <div className="flex justify-center">
                    <button 
                        onClick={handleClick} 
                        autoFocus 
                        className="px-4 py-2 rounded text-white font-bold bg-blue-500 hover:bg-blue-700"
                    >
                        I understand
                    </button>
                </div>
            </div>
        </div>
    );
}
