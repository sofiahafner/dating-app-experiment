import React, { useState } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';

export function PickCharacterTraits() {
    const player = usePlayer();
    const [glasses, setGlasses] = useState('');
    const [hair, setHair] = useState('');
    const [beard, setBeard] = useState('');
    const [hobby, setHobby] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Example of how you might save the collected data
        player.round.set("chosenCharacterGlasses", glasses);
        player.round.set("chosenCharacterHair", hair);
        player.round.set("chosenCharacterBeard", beard);
        player.round.set("chosenCharacterHobby", hobby);
        player.stage.set("submit", true);
    };

    const isFormComplete = glasses && hair && beard && hobby;

    return (
        <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Pick Your Character's Traits</h1>
            <p className="mt-1 text-sm text-gray-500">
                First, you need to pick your Character's traits.
                Make a selection for each category below. Then, click on the submit button.
            </p>

            <form className="mt-12 space-y-8 divide-y divide-gray-200" onSubmit={handleFormSubmit}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="glasses" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Does your character wear glasses?
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="glasses" name="glasses" value={glasses} onChange={e => setGlasses(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Glasses</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <label htmlFor="hair" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Does your character have long or short hair?
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="hair" name="hair" value={hair} onChange={e => setHair(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Hair Length</option>
                                        <option value="Long">Long</option>
                                        <option value="Short">Short</option>
                                    </select>
                                </div>

                                <label htmlFor="beard" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Does your character have a beard?
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="beard" name="beard" value={beard} onChange={e => setBeard(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Beard</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="hobby" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    What is your character's main hobby?
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="hobby" name="hobby" value={hobby} onChange={e => setHobby(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Hobby</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Music">Music</option>
                                        <option value="Arts">Arts and Crafts</option>
                                        <option value="Travel">Travel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isFormComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`} 
                                        disabled={!isFormComplete}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
