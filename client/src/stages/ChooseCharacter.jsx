import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile } from '../utils.jsx';
import profiles from '../../data/peep_profiles.json';
// import profiles from '../data/peep_profiles.json';

export function ChooseCharacter() {
    const player = usePlayer();

    const handlePlayCharacter = (profileId) => {
        player.round.set('chosenProfile', parseInt(profileId));
        player.stage.set("submit", true);
    };

    const glassesChoice = player.round.get("chosenCharacterGlasses") === "Yes";
    const hairChoice = player.round.get("chosenCharacterHair");
    const beardChoice = player.round.get("chosenCharacterBeard") === "Yes";
    const hobbyChoice = player.round.get("chosenCharacterHobby");



    const filterProfiles = (profile) => {
        const profile_glasses = profile.accessories && !profile.accessories.includes('None');
        const profile_hair = profile.hair_short;
        const profile_beard = profile.facial_hair && profile.facial_hair !== 'None';
        const profile_main_hobby = profile.main_hobby;

        const glasses_match = profile_glasses === glassesChoice;
        const hair_match = (hairChoice === 'Long' && !profile_hair) || (hairChoice === 'Short' && profile_hair);
        const beard_match = profile_beard === beardChoice;
        const hobby_matches = profile_main_hobby === hobbyChoice

        return glasses_match && hair_match && beard_match && hobby_matches;
    };
    

    const filteredProfiles = profiles.filter(filterProfiles);

    const shuffledProfiles = filteredProfiles.sort(() => 0.5 - Math.random()).slice(0, 8);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', justifyItems: 'center', alignItems: 'start' }}>
            {shuffledProfiles.map((profile) => {
                return (
                    <div key={profile.profile_ID} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', maxHeight: '450px' }}>
                        {createProfile(profile.profile_ID)}
                        <button
                            onClick={() => handlePlayCharacter(profile.profile_ID)}
                            className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            style={{ marginTop: '10px' }}
                        >
                            Play this Character
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
