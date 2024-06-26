import React, { useState, useEffect } from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile , getFacialHair, getAccessory} from '../utils.jsx';
import profiles from '../../data/peep_profiles.json';

import CharacterSurveyModal from './CharacterSurveyModal.jsx'

export function ChooseCharacter() {
    const player = usePlayer();
    const [glasses, setGlasses] = useState(player.round.get("chosenCharacterGlasses") || 'Yes');
    const [hair, setHair] = useState(player.round.get("chosenCharacterHair") || 'Long');
    const [beard, setBeard] = useState(player.round.get("chosenCharacterBeard") || 'Yes');
    const [hobby, setHobby] = useState(player.round.get("chosenCharacterHobby") || 'Sport');
    const [chosenProfile, setChosenProfile] = useState(null);
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
    

    const handlePlayCharacter = (profileId) => {
        setChosenProfile(profileId);
        setIsSurveyModalOpen(true);
    };

    const handleSurveySubmit = () => {
        player.game.set('chosenProfile', parseInt(chosenProfile));
        player.round.set("submit", true);
    };

    const handleSurveyClose = () => {
        setIsSurveyModalOpen(false);
    };

    useEffect(() => {
        player.round.set("chosenCharacterGlasses", glasses);
        player.round.set("chosenCharacterHair", hair);
        player.round.set("chosenCharacterBeard", beard);
        player.round.set("chosenCharacterHobby", hobby);
    }, [glasses, hair, beard, hobby, player]);

    const glassesChoice = glasses === "Yes";
    const hairChoice = hair;
    const beardChoice = beard === "Yes";
    const hobbyChoice = hobby;

    const filterProfiles = (profile) => {
        const profile_glasses = profile.accessories && !profile.accessories.includes('None');
        const profile_hair = profile.hair_short;
        const profile_beard = profile.facial_hair && profile.facial_hair !== 'None';
        const profile_main_hobby = profile.main_hobby;

        const glasses_match = profile_glasses === glassesChoice;
        const hair_match = (hairChoice === 'Long' && !profile_hair) || (hairChoice === 'Short' && profile_hair);
        const beard_match = profile_beard === beardChoice;
        const hobby_matches = profile_main_hobby === hobbyChoice;

        return glasses_match && hair_match && beard_match && hobby_matches;
    };

    const filteredProfiles = profiles.filter(filterProfiles);
    const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random()).slice(0, 8);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '20%', background: '#282828', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ color: '#DADADA', fontSize: 22, fontFamily: 'Inter', fontWeight: '700' }}>Instructions</div>
                <div style={{ color: '#DADADA', fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>Select the character you want to play by clicking the "Play this Character" button under their profile. Use the form below if you want to change your previous selections.</div>
                <div className="mt-12 space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="glasses" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Glasses
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="glasses" name="glasses" value={glasses} onChange={e => setGlasses(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <label htmlFor="hair" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Hair
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="hair" name="hair" value={hair} onChange={e => setHair(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Long">Long</option>
                                            <option value="Short">Short</option>
                                        </select>
                                    </div>

                                    <label htmlFor="beard" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                    Beard
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="beard" name="beard" value={beard} onChange={e => setBeard(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="hobby" className="block text-sm font-medium" style={{ color: '#DADADA' }}>
                                        What is your character's main hobby?
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="hobby" name="hobby" value={hobby} onChange={e => setHobby(e.target.value)} className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                            <option value="Sport">Sport</option>
                                            <option value="Music">Music</option>
                                            <option value="Arts">Arts and Crafts</option>
                                            <option value="Travel">Travel</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', justifyItems: 'center', alignItems: 'start', width: '80%' }}>
                {shuffledProfiles.map((profile, index) => {
                    const isTopRow = index < 4;
                    return (
                        <div key={profile.profile_ID} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '350px', maxHeight: '450px', marginBottom: isTopRow ? '20px' : '0' }}>
                            {createProfile(profile.profile_ID)}
                            <button
                                onClick={() => handlePlayCharacter(profile.profile_ID)}
                                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                style={{ 
                                    marginTop: '15px',
                                    backgroundColor: '#282828',
                                    color: 'white',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#1f1f1f'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = '#282828'}
                            >
                                Play this Character
                            </button>
                        </div>
                    );
                })}
            </div>
            {isSurveyModalOpen && (
                <CharacterSurveyModal
                    onSubmit={handleSurveySubmit}
                    onClose={handleSurveyClose}
                    profile={chosenProfile}
                />
            )}
        </div>
    );
}

export default ChooseCharacter;
