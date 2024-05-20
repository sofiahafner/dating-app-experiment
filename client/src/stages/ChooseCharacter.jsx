import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { createProfile } from '../utils.jsx';
import profiles from '../../data/profiles.json';

export function ChooseCharacter() {
    const player = usePlayer();

    const handlePlayCharacter = (profileId) => {
        player.round.set('chosenProfile', parseInt(profileId));
        player.stage.set("submit", true);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', justifyItems: 'center', alignItems: 'start' }}>
            {profiles.slice(0, 8).map((profile) => {
                const linkToProfilePicture = `https://raw.githubusercontent.com/sofiahafner/dating-app-experiment/main/profiles/pictures/${profile.profile_ID}.png`;
                return (
                    <div key={profile.profile_ID} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' , maxHeight: '500px' }}>
                        {createProfile(profile.profile_ID, linkToProfilePicture)}
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
