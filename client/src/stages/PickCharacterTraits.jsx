import React, { useState } from 'react';
import { Player, usePlayer } from '@empirica/core/player/classic/react';

export function PickCharacterTraits() {
    const player = usePlayer();
    const [ethnicity, setEthnicity] = useState('');
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('');
    // const [interest, setInterest] = useState('');
    const [lookingForMen, setLookingForMen] = useState(false);
    const [lookingForWomen, setLookingForWomen] = useState(false);
    const [lookingForNonBinary, setLookingForNonBinary] = useState(false);
    const [hobby, setHobby] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Collect data to store
        const genderPreferences = {
            lookingForMen,
            lookingForWomen,
            lookingForNonBinary
        };
        // Example of how you might save the collected data
        player.round.set("chosenCharacterEthnicity", ethnicity);
        player.round.set("chosenCharacterGender", gender);
        player.round.set("chosenCharacterAgeRange", ageRange);
        // player.round.set("chosenCharacterInterest", interest);
        player.round.set("chosenCharacterHobby", hobby);
        player.round.set("chosenCharacterGenderPreferences", genderPreferences);
        console.log({ ethnicity, gender, ageRange, hobby, genderPreferences });
        player.stage.set("submit", true);
    };


    return (
        <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Pick Your Character's Traits</h1>
            <p className="mt-1 text-sm text-gray-500">
                Customize your character's traits for the simulation. Make selections for each category below.
            </p>

            <form className="mt-12 space-y-8 divide-y divide-gray-200" onSubmit={handleFormSubmit}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Ethnicity
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="ethnicity" name="ethnicity" value={ethnicity} onChange={e => setEthnicity(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Ethnicity</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Black">Black</option>
                                        <option value="Hispanic">Hispanic</option>
                                        <option value="White">White</option>
                                        <option value="Mixed">Mixed</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Gender
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Man</option>
                                        <option value="Female">Woman</option>
                                        <option value="Non-binary">Non-Binary Person</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="hobby" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Main Hobby
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="hobby" name="hobby" value={hobby} onChange={e => setHobby(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select a Hobby</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Music">Music</option>
                                        <option value="Art">Art</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Cooking">Cooking</option>
                                        <option value="Reading">Reading</option>
                                        <option value="Gardening">Gardening</option>
                                    </select>
                                </div>
                            </div>


                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Age Range
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="ageRange" name="ageRange" value={ageRange} onChange={e => setAgeRange(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option value="">Select age range</option>
                                        <option value="20-30">20-30</option>
                                        <option value="31-40">31-40</option>
                                        <option value="41-50">41-50</option>
                                        <option value="51-60">51-60</option>
                                        <option value="61-70">61-70</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Looking for (select all that apply):
                                </label>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input id="lookingForMen" name="lookingForMen" type="checkbox" checked={lookingForMen} onChange={e => setLookingForMen(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                        <label htmlFor="lookingForMen" className="ml-3 block text-sm font-medium text-gray-700">Men</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="lookingForWomen" name="lookingForWomen" type="checkbox" checked={lookingForWomen} onChange={e => setLookingForWomen(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                        <label htmlFor="lookingForWomen" className="ml-3 block text-sm font-medium text-gray-700">Women</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="lookingForNonBinary" name="lookingForNonBinary" type="checkbox" checked={lookingForNonBinary} onChange={e => setLookingForNonBinary(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                        <label htmlFor="lookingForNonBinary" className="ml-3 block text-sm font-medium text-gray-700">Non-Binary People</label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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